import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create_payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    const { orderId, cashierId, totalAmount, discount, tax, finalAmount, paidAmount, changeAmount, paymentMethod } = dto;

    const voucherNumber = `V-${Date.now()}`;

    const voucher = await this.prisma.voucher.create({
      data: {
        voucherNumber,
        orderId,
        cashierId,
        totalAmount,
        discount,
        tax,
        finalAmount,
        paidAmount,
        changeAmount,
        paymentMethod,
      },
    });

    return voucher;
  }


  async getPaymentById(id: string) {
    const payment = await this.prisma.voucher.findUnique({
      where: { id },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    return payment;
  }
}
