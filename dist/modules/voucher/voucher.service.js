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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let VoucherService = class VoucherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateVoucher(saleId) {
        const order = await this.prisma.order.findUnique({
            where: { id: saleId },
            include: { orderItems: true },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
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
    async getVoucherById(id) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { id },
            include: { voucherItems: true },
        });
        if (!voucher) {
            throw new common_1.NotFoundException('Voucher not found');
        }
        return voucher;
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map