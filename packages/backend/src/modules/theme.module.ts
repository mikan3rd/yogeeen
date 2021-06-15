import { Module } from "@nestjs/common";

import { ThemeResolver } from "@/resolvers/theme.resolver";
import { PrismaService } from "@/services/prisma.service";
import { ThemeService } from "@/services/theme.service";
import { UserService } from "@/services/user.service";

@Module({
  imports: [],
  providers: [ThemeResolver, ThemeService, PrismaService, UserService],
  exports: [ThemeService],
})
export class ThemeModule {}
