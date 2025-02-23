import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShiftDto } from './dto/create_shift.dto';
import { UpdateShiftDto } from './dto/update_shift.dto';
import { CashierPerformanceDto } from './dto/cashier_performance';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateShiftDto) {
    return await this.prisma.shift.create({
      data: {
        cashierId: dto.cashierId,
        startCash: dto.startCash,
        startTime: dto.startTime,
        endTime: dto.endTime,
        status: dto.status,
      },
    });
  } 

  async update(id: string, dto: UpdateShiftDto) {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');

    return await this.prisma.shift.update({
      where: { id },
      data: {
        endTime: dto.endTime,
        status: dto.status,
      },
    });
  }

  async findAll() {
    return await this.prisma.shift.findMany();
  }

  async findOne(id: string) {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async getCashierPerformance(shiftId: string): Promise<CashierPerformanceDto> {
    const shift = await this.prisma.shift.findUnique({
      where: { id: shiftId },
      include: {
        cashier: true,
        orders: true,
        vouchers: true,
      },
    });

    if (!shift) {
      throw new NotFoundException('Shift not found');
    }

    // Calculate hours worked
    const startTime = new Date(shift.startTime);
    const endTime = shift.endTime ? new Date(shift.endTime) : new Date();
    const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    // Calculate total sales from orders
    const totalOrderSales = shift.orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Calculate total sales from vouchers
    const totalVoucherSales = shift.vouchers.reduce((sum, voucher) => sum + voucher.finalAmount, 0);

    // Total combined sales
    const totalSales = totalOrderSales + totalVoucherSales;

    return {
      cashierId: shift.cashierId,
      cashierName: shift.cashier.name, // Assuming you have a name field in User model
      shiftId: shift.id,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hoursWorked: Number(hoursWorked.toFixed(2)),
      totalSales: Number(totalSales.toFixed(2)),
      totalOrders: shift.orders.length,
      averageSalePerHour: Number((totalSales / hoursWorked).toFixed(2)),
      totalVouchers: shift.vouchers.length,
    };
  }

  async getCashierPerformanceByDateRange(
    cashierId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<CashierPerformanceDto[]> {
    const shifts = await this.prisma.shift.findMany({
      where: {
        cashierId,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        cashier: true,
        orders: true,
        vouchers: true,
      },
    });

    return shifts.map(shift => {
      const startTime = new Date(shift.startTime);
      const endTime = shift.endTime ? new Date(shift.endTime) : new Date();
      const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      const totalOrderSales = shift.orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalVoucherSales = shift.vouchers.reduce((sum, voucher) => sum + voucher.finalAmount, 0);
      const totalSales = totalOrderSales + totalVoucherSales;

      return {
        cashierId: shift.cashierId,
        cashierName: shift.cashier.name,
        shiftId: shift.id,
        startTime: shift.startTime,
        endTime: shift.endTime,
        hoursWorked: Number(hoursWorked.toFixed(2)),
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders: shift.orders.length,
        averageSalePerHour: Number((totalSales / hoursWorked).toFixed(2)),
        totalVouchers: shift.vouchers.length,
      };
    });
  }

  async getDailyCashierPerformance(date: Date): Promise<CashierPerformanceDto[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const shifts = await this.prisma.shift.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        cashier: true,
        orders: true,
        vouchers: true,
      },
    });

    return shifts.map(shift => {
      // Same performance calculation logic as above
      const startTime = new Date(shift.startTime);
      const endTime = shift.endTime ? new Date(shift.endTime) : new Date();
      const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      const totalOrderSales = shift.orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalVoucherSales = shift.vouchers.reduce((sum, voucher) => sum + voucher.finalAmount, 0);
      const totalSales = totalOrderSales + totalVoucherSales;

      return {
        cashierId: shift.cashierId,
        cashierName: shift.cashier.name,
        shiftId: shift.id,
        startTime: shift.startTime,
        endTime: shift.endTime,
        hoursWorked: Number(hoursWorked.toFixed(2)),
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders: shift.orders.length,
        averageSalePerHour: Number((totalSales / hoursWorked).toFixed(2)),
        totalVouchers: shift.vouchers.length,
      };
    });
  }
}
