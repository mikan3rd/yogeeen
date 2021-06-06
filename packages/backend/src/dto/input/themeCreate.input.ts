import { Field, ID, InputType } from "@nestjs/graphql";

import { AnswerTypeModel } from "@/dto/models/theme.model";

@InputType()
export class ThemeCreateInput {
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
}
