import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async generateVoucher(saleId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: saleId },
      include: { orderItems: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const voucherNumber = `V-${Date.now()}`;

    const voucher = await this.prisma.voucher.create({
      data: {
        voucherNumber,
        orderId: saleId,
        cashierId: order.sellerId,
        totalAmount: order.totalAmount,
        discount: order.discount,
        tax: 0,
        finalAmount: order.totalAmount - order.discount,
        paidAmount: order.totalAmount - order.discount,
        changeAmount: 0,
        paymentMethod: order.paymentType,
        voucherItems: {
          create: order.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
            total: item.amount,
          })),
        },
      },
    });

    return voucher;
  }

  async getVoucherById(id: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
      include: { voucherItems: true },
    });

    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }

    return voucher;
  }
}
