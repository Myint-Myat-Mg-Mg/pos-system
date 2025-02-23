import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { User } from '@prisma/client';

export interface TokenPayload { sub: string, role: UserRole };

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }

  async generateToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload,
    { secret: this.configService.getOrThrow('JWT_SECRET') });
  }

  async verify(token: string): Promise<TokenPayload> {
    try {
      const actualToken = token.startsWith('Bearer ')? token.slice(7): token;
      return this.jwtService.verify<TokenPayload>(actualToken, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
