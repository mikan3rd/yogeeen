import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { UserModule } from "@/modules/user.module";
import { DateScalar } from "@/scalars/date.scalar";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    UserModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
