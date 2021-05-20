import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { Request } from "express";
import admin from "firebase-admin";

import { UserService } from "@/services/user.service";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  private logger: Logger = new Logger(GqlAuthGuard.name);

  constructor(private readonly reflector: Reflector, private userService: UserService) {}

  public async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    const idToken = this.getIdToken(ctx.req);

    const decodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch((e) => {
        this.logger.debug(e);
        throw new UnauthorizedException();
      });

    const { uid } = decodedIdToken;
    const user = await this.userService.getUser(uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    ctx.user = user;

    const roles = this.reflector.get<UserRole[] | undefined>("roles", context.getHandler());

    if (roles && roles.length && !roles.includes(user.role)) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private getIdToken(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [bearer, idToken] = authHeader.split(" ");

    if (!bearer || bearer.toLowerCase() !== "bearer") {
      throw new UnauthorizedException();
    }

    if (!idToken) {
      throw new UnauthorizedException();
    }

    return idToken;
  }
}
