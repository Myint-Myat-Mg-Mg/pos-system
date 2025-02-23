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
exports.CreateShiftDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateShiftDto {
}
exports.CreateShiftDto = CreateShiftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345', description: 'ID of the cashier' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "cashierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100.0, description: 'Initial cash amount at the start of the shift' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateShiftDto.prototype, "startCash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-02-18T09:00:00.000Z', description: 'Shift start time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateShiftDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-02-18T17:00:00.000Z', description: 'Shift end time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateShiftDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ONGOING', description: 'Status of the shift', enum: client_1.ShiftStatus }),
    (0, class_validator_1.IsEnum)(client_1.ShiftStatus),
    __metadata("design:type", String)
], CreateShiftDto.prototype, "status", void 0);
//# sourceMappingURL=create_shift.dto.js.map