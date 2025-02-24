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
exports.CreateOrderDto = exports.CreateOrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class CreateOrderItemDto {
}
exports.CreateOrderItemDto = CreateOrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity of the product', example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the product', example: 5000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "price", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of order items', type: [CreateOrderItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orderItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment type', enum: client_1.PaymentType, example: client_1.PaymentType.CASH }),
    (0, class_validator_1.IsEnum)(client_1.PaymentType),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentType", void 0);
//# sourceMappingURL=create_sale.dto.js.map