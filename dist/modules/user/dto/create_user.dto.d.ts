export declare class CreateUserDto {
    name: string;
    username: string;
    pin: string;
    role?: 'ADMIN' | 'MANAGER' | 'CASHIER';
}
export declare class LoginDto {
    username: string;
    pin: string;
}
