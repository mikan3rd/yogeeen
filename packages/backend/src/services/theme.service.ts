import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { ThemeCreateInput } from "@/dto/input/themeCreate.input";
import { PrismaService } from "@/services/prisma.service";

@Injectable()
export class ThemeService {
  constructor(private prisma: PrismaService) {}

  async createTheme(data: { user: User; theme: ThemeCreateInput }) {
    const { user, theme } = data;
    return await this.prisma.theme.create({
      data: { ...theme, authorId: user.uid },
    });
  }
}
