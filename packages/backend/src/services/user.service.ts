import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "@/services/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(uid: string) {
    return await this.prisma.user.findUnique({
      where: { uid },
    });
  }

  async upsertUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.upsert({
      where: { uid: data.uid },
      create: data,
      update: data,
    });
  }
}
