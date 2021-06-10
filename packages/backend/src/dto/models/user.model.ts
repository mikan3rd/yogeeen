import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

enum UserRoleModel {
  NONE = "NONE",
  ADMIN = "ADMIN",
}

registerEnumType(UserRoleModel, { name: "UserRole" });

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  uid!: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field((type) => UserRoleModel)
  role!: UserRoleModel;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
