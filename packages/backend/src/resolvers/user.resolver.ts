import { Inject, UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";

import { CurrentUser } from "@/decorators/auth.decorator";
import { UserModel } from "@/dto/models/user.model";
import { GqlAuthGuard } from "@/guards/gqlAuthGuard.guard";
import { UserService } from "@/services/user.service";

@Resolver()
export class AdminResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => UserModel)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
