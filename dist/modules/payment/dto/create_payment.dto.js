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
exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreatePaymentDto {
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b8a8f0b1-0f48-4a66-8b98-3aab3498c839', description: 'Order ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a7a9f4b2-0a22-4d5c-8b98-1ccb4459c888', description: 'Cashier ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "cashierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100.0, description: 'Total amount of the order' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.0, description: 'Discount applied' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Tax amount' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95.0, description: 'Final amount after discount and tax' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "finalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100.0, description: 'Amount paid by the customer' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Change amount to be given back' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "changeAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CASH', enum: client_1.PaymentType, description: 'Payment method used' }),
    (0, class_validator_1.IsEnum)(client_1.PaymentType),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paymentMethod", void 0);
//# sourceMappingURL=create_payment.dto.js.map