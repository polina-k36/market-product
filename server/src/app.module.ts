import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module.js';
import { SessionsService } from './sessions/sessions.service.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { VerificationsModule } from './verifications/verifications.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    AuthModule, ProductsModule, CategoriesModule, UsersModule, PrismaModule, OrdersModule, SessionsModule, VerificationsModule],
  controllers: [AppController],
  providers: [AppService, SessionsService],
})
export class AppModule {}
