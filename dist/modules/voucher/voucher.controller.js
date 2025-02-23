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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voucher_service_1 = require("./voucher.service");
const roles_decorator_1 = require("../../core/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const client_1 = require("@prisma/client");
let VoucherController = class VoucherController {
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    async generateVoucher(saleId) {
        return this.voucherService.generateVoucher(saleId);
    }
    async getVoucher(id) {
        const voucher = await this.voucherService.getVoucherById(id);
        if (!voucher) {
            throw new common_1.NotFoundException('Voucher not found');
        }
        return voucher;
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Post)('generate/:saleId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a receipt after payment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Receipt generated successfully.' }),
    __param(0, (0, common_1.Param)('saleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "generateVoucher", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'Get receipt details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt fetched successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Receipt not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getVoucher", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('vouchers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map