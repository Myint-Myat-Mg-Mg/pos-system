import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsEnum } from 'class-validator';
import { PaymentType } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ example: 'b8a8f0b1-0f48-4a66-8b98-3aab3498c839', description: 'Order ID' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ example: 'a7a9f4b2-0a22-4d5c-8b98-1ccb4459c888', description: 'Cashier ID' })
  @IsUUID()
  cashierId: string;

  @ApiProperty({ example: 100.0, description: 'Total amount of the order' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ example: 10.0, description: 'Discount applied' })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 5.0, description: 'Tax amount' })
  @IsNumber()
  tax: number;

  @ApiProperty({ example: 95.0, description: 'Final amount after discount and tax' })
  @IsNumber()
  finalAmount: number;

  @ApiProperty({ example: 100.0, description: 'Amount paid by the customer' })
  @IsNumber()
  paidAmount: number;

  @ApiProperty({ example: 5.0, description: 'Change amount to be given back' })
  @IsNumber()
  changeAmount: number;

  @ApiProperty({ example: 'CASH', enum: PaymentType, description: 'Payment method used' })
  @IsEnum(PaymentType)
  paymentMethod: PaymentType;
}
