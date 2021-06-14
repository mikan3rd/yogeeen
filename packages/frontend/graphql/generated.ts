import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: number;
};

export enum AnswerType {
  BoolChoice = "BOOL_CHOICE",
  SingleChoice = "SINGLE_CHOICE",
  MultiChoice = "MULTI_CHOICE",
}

export type Mutation = {
  createTheme: ThemeModel;
};

export type MutationCreateThemeArgs = {
  theme: ThemeCreateInput;
};

export type Query = {
  getCurrentUser: UserModel;
};

export type ThemeCreateInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  answerType: AnswerType;
  deadline: Scalars["Date"];
};

export type ThemeModel = {
  uuid: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  isOfficial: Scalars["Boolean"];
  answerType: AnswerType;
  authorId: Scalars["ID"];
  deadline: Scalars["Date"];
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
};

export type UserModel = {
  uid: Scalars["ID"];
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  role: UserRole;
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
};

export enum UserRole {
  None = "NONE",
  Admin = "ADMIN",
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  getCurrentUser: Pick<UserModel, "uid" | "displayName" | "email" | "role" | "createdAt" | "updatedAt">;
};

export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    getCurrentUser {
      uid
      displayName
      email
      role
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
}
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
