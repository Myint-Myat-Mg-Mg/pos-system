"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftModule = void 0;
const common_1 = require("@nestjs/common");
const shift_service_1 = require("./shift.service");
const shift_controller_1 = require("./shift.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const token_service_1 = require("../auth/token/token.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let ShiftModule = class ShiftModule {
};
exports.ShiftModule = ShiftModule;
exports.ShiftModule = ShiftModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
        ],
        controllers: [shift_controller_1.ShiftController],
        providers: [shift_service_1.ShiftService, jwt_guard_1.AuthGuard, token_service_1.TokenService],
        exports: [shift_service_1.ShiftService],
    })
], ShiftModule);
//# sourceMappingURL=shift.module.js.map