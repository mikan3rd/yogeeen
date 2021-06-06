import { Module } from "@nestjs/common";

import { ThemeResolver } from "@/resolvers/theme.resolver";
import { PrismaService } from "@/services/prisma.service";
import { ThemeService } from "@/services/theme.service";

@Module({
  imports: [],
  providers: [ThemeResolver, ThemeService, PrismaService],
  exports: [ThemeService],
})
export class ThemeModule {}
