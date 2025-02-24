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
exports.ShiftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shift_service_1 = require("./shift.service");
const create_shift_dto_1 = require("./dto/create_shift.dto");
const update_shift_dto_1 = require("./dto/update_shift.dto");
const cashier_performance_1 = require("./dto/cashier_performance");
const roles_decorator_1 = require("../../core/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const client_1 = require("@prisma/client");
let ShiftController = class ShiftController {
    constructor(shiftService) {
        this.shiftService = shiftService;
    }
    create(createShiftDto) {
        return this.shiftService.create(createShiftDto);
    }
    async endShift(ShiftId) {
        return this.shiftService.endShift(ShiftId);
    }
    update(ShiftId, updateShiftDto) {
        return this.shiftService.update(ShiftId, updateShiftDto);
    }
    findAll() {
        return this.shiftService.findAll();
    }
    findOne(ShiftId) {
        return this.shiftService.findOne(ShiftId);
    }
    async getActiveShift(cashierId) {
        return this.shiftService.getActiveShift(cashierId);
    }
    async getShiftPerformance(shiftId) {
        return this.shiftService.getCashierPerformance(shiftId);
    }
    async getDailyPerformance(date) {
        return this.shiftService.getDailyCashierPerformance(new Date(date));
    }
};
exports.ShiftController = ShiftController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shift', description: 'Creates a new shift with current timestamp as start time' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Shift created successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Cashier already has an active shift'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shift_dto_1.CreateShiftDto]),
    __metadata("design:returntype", void 0)
], ShiftController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'End a shift' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Shift ended successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Shift not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Shift is already ended'
    }),
    __param(0, (0, common_1.Param)('ShiftId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "endShift", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing shift' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shift updated successfully' }),
    __param(0, (0, common_1.Param)('ShiftId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shift_dto_1.UpdateShiftDto]),
    __metadata("design:returntype", void 0)
], ShiftController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shifts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all shifts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShiftController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get shift by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shift found' }),
    __param(0, (0, common_1.Param)('ShiftId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShiftController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('active/:cashierId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get active shift for a cashier' }),
    __param(0, (0, common_1.Param)('cashierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getActiveShift", null);
__decorate([
    (0, common_1.Get)(':shiftId/performance'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get cashier performance for a specific shift' }),
    (0, swagger_1.ApiParam)({ name: 'shiftId', description: 'ID of the shift' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns cashier performance for the shift',
        type: cashier_performance_1.CashierPerformanceDto
    }),
    __param(0, (0, common_1.Param)('shiftId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getShiftPerformance", null);
__decorate([
    (0, common_1.Get)('daily-performance'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily performance for all cashiers' }),
    (0, swagger_1.ApiQuery)({
        name: 'date',
        required: true,
        description: 'Date to get performance (YYYY-MM-DD)',
        example: '2025-02-21'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns daily performance for all cashiers',
        type: [cashier_performance_1.CashierPerformanceDto]
    }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getDailyPerformance", null);
exports.ShiftController = ShiftController = __decorate([
    (0, swagger_1.ApiTags)('Shifts'),
    (0, common_1.Controller)('shifts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [shift_service_1.ShiftService])
], ShiftController);
//# sourceMappingURL=shift.controller.js.map