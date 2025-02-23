import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'cashier' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'cashier123' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  pin: string;

  @ApiProperty({ enum: UserRole, example: 'CASHIER' })
  @IsEnum(UserRole)
  role: UserRole;
}
