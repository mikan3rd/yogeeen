import { Module } from "@nestjs/common";

import { UserResolver } from "@/resolvers/user.resolver";
import { PrismaService } from "@/services/prisma.service";
import { UserService } from "@/services/user.service";

@Module({
  imports: [],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
