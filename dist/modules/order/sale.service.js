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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SaleService = class SaleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSale(createOrderDto, sellerId) {
        const { orderItems, paymentType } = createOrderDto;
        if (!Array.isArray(orderItems)) {
            throw new common_1.BadRequestException('orderItems must be an array');
        }
        const activeShift = await this.prisma.shift.findFirst({
            where: {
                cashierId: sellerId,
                status: 'ONGOING',
            },
        });
        if (!activeShift) {
            throw new common_1.BadRequestException('No active shift found. Please start a shift first.');
        }
        const totalAmount = orderItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
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
    async getSaleById(id) {
        const sale = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });
        if (!sale) {
            throw new common_1.NotFoundException('Order not found');
        }
        return sale;
    }
    async reprintReceipt(id) {
        const sale = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });
        if (!sale) {
            throw new common_1.NotFoundException('Sale not found');
        }
        return {
            message: 'Receipt reprint successful',
            sale,
        };
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleService);
//# sourceMappingURL=sale.service.js.map