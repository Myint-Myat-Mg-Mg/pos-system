import { TokenPayload, TokenService } from '../token/token.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export type AuthenticatedRequest = Request & {
    user: TokenPayload;
};
export declare class AuthGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
