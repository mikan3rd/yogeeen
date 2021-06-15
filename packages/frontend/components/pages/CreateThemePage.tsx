import React from "react";

import dayjs from "dayjs";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { Divider, Form, Message, Segment } from "semantic-ui-react";

import { AnswerType } from "@/graphql/generated";
import { useCreateTheme } from "@/hooks/useCreateTheme";

const DateFormat = "YYYY/MM/DD";
const TimeFormat = "HH:mm";

const AnswerTypeOptions: { value: AnswerType; text: string; description: string }[] = [
  {
    value: AnswerType.BoolChoice,
    text: "YES or NO",
    description: "2つの選択肢の中から片方を選ぶ方法",
  },
  {
    value: AnswerType.SingleChoice,
    text: "1つ選択",
    description: "複数の選択肢の中から1つだけ選択する方法",
  },
];

export const CreateThemePage: React.VFC = () => {
  const { title, description, answerType, deadline, isValid, dispatch, handleCreateTheme } = useCreateTheme();
  return (
    <div>
      <Segment>
        <Form>
          <Form.Field>
            <label>タイトル</label>
            <Message content="予言してほしいテーマのタイトルを記入してください" size="mini" />
            <Form.Input value={title} onChange={(e) => dispatch({ type: "setTitle", payload: e.target.value })} />
          </Form.Field>
          <Divider />
          <Form.Field>
            <label>説明</label>
            <Message content="予言してほしいテーマの詳細を記入してください" size="mini" />
            <Form.TextArea
              value={description}
              onChange={(e) => dispatch({ type: "setDescription", payload: e.target.value })}
            />
          </Form.Field>
          <Divider />
          <Form.Field>
            <label>予言方法</label>
            <Message content="予言の回答方法を選択してください" size="mini" />
            <Form.Select
              value={answerType}
              options={AnswerTypeOptions}
              onChange={(e, d) => dispatch({ type: "setAnswerType", payload: d.value as AnswerType })}
            />
          </Form.Field>
          <Divider />
          <Form.Field>
            <label>予言締切日時</label>
            <Message content="予言締切日時を過ぎると予言ができなくなります" size="mini" />
            <DateInput
              inline
              dateFormat={DateFormat}
              value={deadline.format(DateFormat)}
              localization="ja"
              onChange={(e, d) =>
                dispatch({ type: "setDeadline", payload: dayjs(d.value, DateFormat).hour(deadline.hour()) })
              }
            />
            <TimeInput
              inline
              value={deadline.format(TimeFormat)}
              localization="ja"
              onChange={(e, d) => {
                dispatch({ type: "setDeadline", payload: deadline.hour(dayjs(d.value, TimeFormat).hour()) });
              }}
              disableMinute
            />
          </Form.Field>

          <Form.Button content="予言のテーマを作成" color="blue" disabled={!isValid} onClick={handleCreateTheme} />
        </Form>
      </Segment>
    </div>
  );
};
