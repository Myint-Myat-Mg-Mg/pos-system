import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { TokenService } from '../auth/token/token.service';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string, requesterRole: UserRole): Promise<User> {
  const user = await this.prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('User not found.');
  }
  return user;
}

async validateSession(token: string) {
  const decoded = await this.tokenService.verify(token);
  if (!decoded) throw new UnauthorizedException('Invalid session');

  return decoded;
}

  async logout(token: string) {
    const session = await this.prisma.session.findUnique({ where: { token } });
    
    if(!session){
      throw new UnauthorizedException('Session not found');
    }

    await this.prisma.session.delete({ where: { token } });
    return { message: 'Logged out successfully' };
  }

  async updateUserRole(id: string, updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;

    if (!Object.values(UserRole).includes(role)) {
      throw new UnauthorizedException('Invalid role');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
