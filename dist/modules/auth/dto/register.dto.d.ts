import { UserRole } from '@prisma/client';
export declare class RegisterDto {
    name: string;
    username: string;
    pin: string;
    role: UserRole;
}
