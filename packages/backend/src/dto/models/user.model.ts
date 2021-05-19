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

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field((type) => UserRoleModel)
  role!: UserRoleModel;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
