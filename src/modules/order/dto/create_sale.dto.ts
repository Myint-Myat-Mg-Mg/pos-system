import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEnum, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { PaymentType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
    @ApiProperty({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsString()
    @IsUUID()
    productId: string;
  
    @ApiProperty({ description: 'Quantity of the product', example: 2 })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    quantity: number;
  
    @ApiProperty({ description: 'Price of the product', example: 19.99 })
    @IsNumber()
    @Type(() => Number)
    price: number;
  }
  
  export class CreateOrderDto {
    @ApiProperty({ description: 'List of order items', type: [CreateOrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
  
    @ApiProperty({ description: 'Payment type', enum: PaymentType, example: PaymentType.CASH })
    @IsEnum(PaymentType)
    paymentType: PaymentType;
  }