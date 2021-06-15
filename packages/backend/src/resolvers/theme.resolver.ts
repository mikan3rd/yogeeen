import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";

import { CurrentUser } from "@/decorators/auth.decorator";
import { ThemeCreateInput } from "@/dto/input/themeCreate.input";
import { ThemeModel } from "@/dto/models/theme.model";
import { GqlAuthGuard } from "@/guards/gqlAuthGuard.guard";
import { ThemeService } from "@/services/theme.service";

@Resolver()
export class ThemeResolver {
  constructor(@Inject(ThemeService) private themeService: ThemeService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => ThemeModel)
  async createTheme(@CurrentUser() user: User, @Args("theme") theme: ThemeCreateInput) {
    return this.themeService.createTheme({ user, theme });
  }
}
