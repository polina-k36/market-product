import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { VerificationsModule } from './verifications/verifications.module.js';
import { MailModule } from './mail/mail.module.js';
import { UserIdentitiesModule } from './user-identities/user-identities.module.js';
import { DeliveryMethodsModule } from './delivery-methods/delivery-methods.module.js';
import { InvoiceTypeModule } from './invoice-type/invoice-types.module.js';
import { NdsModule } from './nds/nds.module.js';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module.js';
import { ShopsModule } from './shops/shops.module.js';
import { StatusesModule } from './statuses/statuses.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';
import { UnitsModule } from './units/units.module.js';
import { UserAddressesModule } from './user-addresses/user-addresses.module.js';
import { UserCardsModule } from './user-cards/user-cards.module.js';
import { OrderItemsModule } from './order-items/order-items.module.js';
import { ProductStockModule } from './product-stock/product-stock.module.js';
import { JwtTokensModule } from './jwt-tokens/jwt-tokens.module.js';
import { InvoicesModule } from './invoices/invoices.module.js';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module.js';
import { envSchema } from './common/config/env.validation.js';
import appConfig from './common/config/app.config.js';
import databaseConfig from './common/config/database.config.js';
import jwtConfig from './common/config/jwt.config.js';
import mailConfig from './common/config/mail.config.js';
import googleConfig from './common/config/google.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, mailConfig, googleConfig],
      validationSchema: envSchema,
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
    NdsModule,
    PaymentMethodsModule,
    ShopsModule,
    StatusesModule,
    SuppliersModule,
    UnitsModule,
    UserAddressesModule,
    UserCardsModule,
    OrderItemsModule,
    ProductStockModule,
    JwtTokensModule,
    InvoicesModule,
    InvoiceItemsModule,
  ],
})
export class AppModule {}
