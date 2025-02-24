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
exports.SaleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sale_service_1 = require("./sale.service");
const create_sale_dto_1 = require("./dto/create_sale.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../core/decorators/roles.decorator");
let SaleController = class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
    }
    async createOrder(createOrderDto, req) {
        const sellerId = req.user.id || req.user.sub;
        if (!Array.isArray(createOrderDto.orderItems)) {
            throw new common_1.BadRequestException('orderItems must be an array');
        }
        const validatedOrderItems = createOrderDto.orderItems.map(item => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            price: Number(item.price)
        }));
        return this.saleService.createSale({
            ...createOrderDto,
            orderItems: validatedOrderItems
        }, sellerId);
    }
    async getAllSales() {
        return this.saleService.getAllSales();
    }
    async getOrder(id) {
        return this.saleService.getSaleById(id);
    }
    async reprintReceipt(id) {
        return this.saleService.reprintReceipt(id);
    }
};
exports.SaleController = SaleController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request data.' }),
    (0, swagger_1.ApiBody)({ type: create_sale_dto_1.CreateOrderDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'List all sales with filters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getAllSales", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order fetched successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)('/reprint/:id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.CASHIER),
    (0, swagger_1.ApiOperation)({ summary: 'Reprint receipt for a sale' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt reprinted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sale not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "reprintReceipt", null);
exports.SaleController = SaleController = __decorate([
    (0, common_1.Controller)('sales'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [sale_service_1.SaleService])
], SaleController);
//# sourceMappingURL=sale.controller.js.map