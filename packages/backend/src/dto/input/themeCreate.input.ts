import { Field, InputType } from "@nestjs/graphql";

import { AnswerTypeModel } from "@/dto/models/theme.model";

@InputType()
export class ThemeCreateInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field((type) => AnswerTypeModel)
  answerType!: AnswerTypeModel;

  @Field()
  deadline!: Date;

  @Field()
  announcementDate!: Date;
}
