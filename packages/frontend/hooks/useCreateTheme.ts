import React, { useCallback, useReducer } from "react";

import dayjs from "dayjs";
import { produce } from "immer";

import { AnswerType } from "@/graphql/generated";

type State = {
  title: string;
  description: string;
  answerType: AnswerType;
  deadline: dayjs.Dayjs;
};

type Action =
  | { type: "initialize" }
  | { type: "setTitle"; payload: State["title"] }
  | { type: "setDescription"; payload: State["description"] }
  | { type: "setAnswerType"; payload: State["answerType"] }
  | { type: "setDeadline"; payload: State["deadline"] };

const initialState: State = {
  title: "",
  description: "",
  answerType: AnswerType.BoolChoice,
  deadline: dayjs().add(7, "day").minute(0).second(0).millisecond(0),
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return initialState;
    case "setTitle":
      return produce(state, (draftState) => {
        draftState.title = action.payload;
      });
    case "setDescription":
      return produce(state, (draftState) => {
        draftState.description = action.payload;
      });
    case "setAnswerType":
      return produce(state, (draftState) => {
        draftState.answerType = action.payload;
      });
    case "setDeadline":
      return produce(state, (draftState) => {
        draftState.deadline = action.payload;
      });
    default:
      return state;
  }
};

export const useCreateTheme = () => {
  const [{ title, description, answerType, deadline }, dispatch] = useReducer(reducer, initialState);

  const validate = useCallback(() => {
    if (title.length === 0) {
      return false;
    }
    if (description.length === 0) {
      return false;
    }
    return true;
  }, [description, title]);

  return {
    title,
    description,
    answerType,
    deadline,
    dispatch,
  };
};
