import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update_user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string, req: any): Promise<{
        username: string;
        pin: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
