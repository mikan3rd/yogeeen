import { Module } from "@nestjs/common";

import { PrismaService } from "@/services/prisma.service";
import { UserService } from "@/services/user.service";

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
