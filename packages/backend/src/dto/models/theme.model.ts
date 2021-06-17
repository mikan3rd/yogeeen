import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum AnswerTypeModel {
  BOOL_CHOICE = "BOOL_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTI_CHOICE = "MULTI_CHOICE",
}

registerEnumType(AnswerTypeModel, { name: "AnswerType" });

@ObjectType()
export class ThemeModel {
  @Field((type) => ID)
  uuid!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  isOfficial!: boolean;

  @Field((type) => AnswerTypeModel)
  answerType!: AnswerTypeModel;

  @Field((type) => ID)
  authorId!: string;

  @Field()
  deadline!: Date;

  @Field()
  announcementDate!: Date;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
