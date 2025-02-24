import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create_sale.dto';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSale(createOrderDto: CreateOrderDto, sellerId: string) {
    const { orderItems, paymentType } = createOrderDto;
  
    if (!Array.isArray(orderItems)) {
      throw new BadRequestException('orderItems must be an array');
    }

    const activeShift = await this.prisma.shift.findFirst({
      where: {
        cashierId: sellerId,
        status: 'ONGOING',
      },
    });
  
    if (!activeShift) {
      throw new BadRequestException('No active shift found. Please start a shift first.');
    }

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + (Number(item.price) * Number(item.quantity)),
      0
    );    
  
    const sale = await this.prisma.order.create({
      data: {
        seller: {
          connect: {
            id: sellerId,
          }
        },
        shift: {
          connect: {
            id: activeShift.id,
          }
        },
        totalAmount,
        paymentType,
        orderItems: {
          create: orderItems.map(item => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            price: Number(item.price),
            amount: Number(item.price) * Number(item.quantity),
          })), 
        },
      },
      include: {
        orderItems: true, 
        seller: true,
        shift: true,
      }
    });
  
    await this.prisma.shift.update({
      where: {
        id: activeShift.id,
      },
      data: {
        totalSales: {
          increment: totalAmount,
        },
      },
    });
  
    return sale;
  }
  

  async getAllSales() {
    return this.prisma.order.findMany({
      include: { orderItems: true },
    });
  }

  async getSaleById(id: string) {
    const sale = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
    if (!sale) {
      throw new NotFoundException('Order not found');
    }
    return sale;
  }

  async reprintReceipt(id: string) {
    const sale = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    return {
      message: 'Receipt reprint successful',
      sale,
    };
  }
}
