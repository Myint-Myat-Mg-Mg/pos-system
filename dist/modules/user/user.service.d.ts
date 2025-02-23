import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto/update_user.dto';
import { TokenService } from '../auth/token/token.service';
export declare class UserService {
    private prisma;
    private tokenService;
    constructor(prisma: PrismaService, tokenService: TokenService);
    findByUsername(username: string): Promise<User | null>;
    findById(id: string, requesterRole: UserRole): Promise<User>;
    validateSession(token: string): Promise<import("../auth/token/token.service").TokenPayload>;
    logout(token: string): Promise<{
        message: string;
    }>;
    updateUserRole(id: string, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        pin: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        username: string;
        pin: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
