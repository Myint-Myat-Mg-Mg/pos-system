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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentService = class PaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPayment(dto) {
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
    async getPaymentById(id) {
        const payment = await this.prisma.voucher.findUnique({
            where: { id },
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        return payment;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map