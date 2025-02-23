import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { HashService } from './hash/hash.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly hashService;
    constructor(prisma: PrismaService, jwtService: JwtService, hashService: HashService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            username: string;
            pin: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        accessToken: string;
    }>;
}
