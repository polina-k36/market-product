import { Module } from '@nestjs/common';
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
import { MailModule } from './mail/mail.module.js';
import { UserIdentitiesModule } from './user-identities/user-identities.module.js';
import { DeliveryMethodsModule } from './delivery-methods/delivery-methods.module.js';
import { InvoiceTypeModule } from './invoice-type/invoice-types.module.js';
import { NestModule } from './nest/nest.module.js';
import { NdsModule } from './nds/nds.module.js';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module.js';
import { ShopsModule } from './shops/shops.module.js';
import { StatusesModule } from './statuses/statuses.module.js';
import { SupplierModule } from './supplier/supplier.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    PrismaModule,
    OrdersModule,
    SessionsModule,
    VerificationsModule,
    MailModule,
    UserIdentitiesModule,
    DeliveryMethodsModule,
    InvoiceTypeModule,
    NestModule,
    NdsModule,
    PaymentMethodsModule,
    ShopsModule,
    StatusesModule,
    SupplierModule,
    SuppliersModule,
  ],
  providers: [SessionsService],
})
export class AppModule {}
