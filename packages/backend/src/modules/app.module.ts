import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { ThemeModule } from "@/modules/theme.module";
import { UserModule } from "@/modules/user.module";
import { DateScalar } from "@/scalars/date.scalar";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    UserModule,
    ThemeModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
