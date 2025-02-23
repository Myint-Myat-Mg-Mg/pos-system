"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ShiftService = class ShiftService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async update(id, dto) {
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
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
    async findOne(id) {
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        return shift;
    }
    async getCashierPerformance(shiftId) {
        const shift = await this.prisma.shift.findUnique({
            where: { id: shiftId },
            include: {
                cashier: true,
                orders: true,
                vouchers: true,
            },
        });
        if (!shift) {
            throw new common_1.NotFoundException('Shift not found');
        }
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
    }
    async getCashierPerformanceByDateRange(cashierId, startDate, endDate) {
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
    async getDailyCashierPerformance(date) {
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
};
exports.ShiftService = ShiftService;
exports.ShiftService = ShiftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftService);
//# sourceMappingURL=shift.service.js.map