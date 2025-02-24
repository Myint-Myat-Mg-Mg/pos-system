import { Module } from '@nestjs/common';
import { ProductService } from './product.service'; 
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { TokenService } from '../auth/token/token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthGuard, TokenService],
  exports: [ProductService],
})
export class ProductModule {}
