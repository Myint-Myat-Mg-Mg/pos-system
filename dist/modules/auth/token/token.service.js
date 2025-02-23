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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
;
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async create(payload) {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('JWT_SECRET'),
        });
    }
    async generateToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
        };
        return this.jwtService.sign(payload, { secret: this.configService.getOrThrow('JWT_SECRET') });
    }
    async verify(token) {
        try {
            const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
            return this.jwtService.verify(actualToken, {
                secret: this.configService.getOrThrow('JWT_SECRET'),
            });
        }
        catch (error) {
            console.error('JWT verification failed:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map