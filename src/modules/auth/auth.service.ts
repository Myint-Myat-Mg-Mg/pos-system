import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { HashService } from './hash/hash.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, username, pin, role } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already taken');
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

  async login(loginDto: LoginDto) {
    const { username, pin } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPinValid = await this.hashService.verify(user.pin, pin);
    if(!isPinValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { message: 'Login Successful', accessToken};
  }
}
