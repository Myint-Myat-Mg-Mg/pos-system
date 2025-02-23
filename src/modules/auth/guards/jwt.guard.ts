import { TokenPayload, TokenService } from '../token/token.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export type AuthenticatedRequest = Request & { user: TokenPayload };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log('Extracted Token:', token);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.tokenService.verify(token);
      console.log('Token payload:', payload); // Add this log

      // Make sure the payload has the correct structure
      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = payload;
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
