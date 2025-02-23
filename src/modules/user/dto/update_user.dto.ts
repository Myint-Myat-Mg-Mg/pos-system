import { IsString, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: "CASHIER", enum: ['ADMIN', 'MANAGER', 'CASHIER'] })
  @IsEnum(['ADMIN', 'MANAGER', 'CASHIER'])
  role: 'ADMIN' | 'MANAGER' | 'CASHIER';
}
