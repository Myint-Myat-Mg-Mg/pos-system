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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const hash_service_1 = require("./hash/hash.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, hashService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.hashService = hashService;
    }
    async register(registerDto) {
        const { name, username, pin, role } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username already taken');
        }
        const hashedPin = await this.hashService.hash(pin);
        const newUser = await this.prisma.user.create({
            data: {
                name,
                username,
                pin: hashedPin,
                role,
            },
        });
        return { message: 'User registered successfully', user: newUser };
    }
    async login(loginDto) {
        const { username, pin } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPinValid = await this.hashService.verify(user.pin, pin);
        if (!isPinValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);
        return { message: 'Login Successful', accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        hash_service_1.HashService])
], AuthService);
//# sourceMappingURL=auth.service.js.map