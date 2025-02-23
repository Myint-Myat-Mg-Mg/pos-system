import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SaleModule } from './modules/order/sale.module';
import { ProductModule } from './modules/product/product.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { ShiftModule } from './modules/shift/shift.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
    UserModule,
    PrismaModule,
    SaleModule,
    ProductModule,
    VoucherModule,
    ShiftModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

