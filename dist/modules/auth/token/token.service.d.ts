import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { User } from '@prisma/client';
export interface TokenPayload {
    sub: string;
    role: UserRole;
}
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    create(payload: TokenPayload): Promise<string>;
    generateToken(user: User): Promise<string>;
    verify(token: string): Promise<TokenPayload>;
}
