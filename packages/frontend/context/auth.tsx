import React from "react";

import { ApolloError } from "@apollo/client";
import { toast } from "react-semantic-toasts";

import firebase from "@/firebase/clientApp";
import { GetCurrentUserQuery, UserModel, useGetCurrentUserLazyQuery } from "@/graphql/generated";

type State = {
  authStatus: "initial" | "loading" | "completed";
  firebaseUser: firebase.User | null;
  currentUser: UserModel | null;
};

type Action =
  | {
      type: "SetAuthStatus";
      payload: State["authStatus"];
    }
  | {
      type: "SetFirebaseUser";
      payload: State["firebaseUser"];
    }
  | {
      type: "SetCurrentUser";
      payload: State["currentUser"];
    };

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "SetAuthStatus":
      return { ...state, authStatus: action.payload };

    case "SetFirebaseUser":
      return { ...state, firebaseUser: action.payload };

    case "SetCurrentUser":
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

export const AuthContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      loginWithGoogle: () => void;
      loginWithTwitter: () => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    authStatus: "initial",
    firebaseUser: null,
    currentUser: null,
  });
  const { firebaseUser } = state;

  const logout = React.useCallback(async (withToast = true) => {
    await firebase.auth().signOut();
    dispatch({ type: "SetFirebaseUser", payload: null });
    dispatch({ type: "SetCurrentUser", payload: null });
    localStorage.removeItem("token");

    if (withToast) {
      toast({
        type: "success",
        title: "ログアウトしました！",
      });
    }
  }, []);

  const handleCompleteCurrentUser = React.useCallback((data: GetCurrentUserQuery) => {
    dispatch({ type: "SetCurrentUser", payload: data.getCurrentUser });
    dispatch({ type: "SetAuthStatus", payload: "completed" });

    if (data.getCurrentUser.role !== "NONE") {
      toast({
        type: "success",
        title: "ログインしました！",
      });
    }
  }, []);

  const handleErrorCurrentUser = React.useCallback(
    (error: ApolloError) => {
      logout(false);
      dispatch({ type: "SetAuthStatus", payload: "completed" });
      toast({
        type: "error",
        title: error.name,
        description: error.message,
      });
    },
    [logout],
  );

  const [fetchCurrentUser] = useGetCurrentUserLazyQuery({
    onCompleted: handleCompleteCurrentUser,
    onError: handleErrorCurrentUser,
    fetchPolicy: "cache-and-network",
  });

  const setCurrentUser = React.useCallback(async () => {
    dispatch({ type: "SetAuthStatus", payload: "loading" });

    firebase.auth().onAuthStateChanged(async (currentUser) => {
      dispatch({ type: "SetFirebaseUser", payload: currentUser });

      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        localStorage.setItem("token", idToken);
        fetchCurrentUser();
      } else {
        await firebase.auth().signInAnonymously();
      }
    });
  }, [fetchCurrentUser]);

  const loginWithGoogle = React.useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    const credential = await firebaseUser?.linkWithPopup(provider);

    if (credential) {
      // TODO: 初回のみ displayName, email, role を更新
    }

    await setCurrentUser();
  }, [setCurrentUser, firebaseUser]);

  const loginWithTwitter = React.useCallback(async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({ force_login: true });
    await firebase.auth().signInWithPopup(provider);
    const credential = await firebaseUser?.linkWithPopup(provider);

    if (credential) {
      // TODO: 初回のみ displayName, email, role を更新
    }

    await setCurrentUser();
  }, [setCurrentUser, firebaseUser]);

  React.useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch, loginWithGoogle, loginWithTwitter, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
