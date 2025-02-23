import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "john123" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "1234", description: "4-digit PIN" })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  pin: string;

  @ApiProperty({ example: "CASHIER", enum: ['ADMIN', 'MANAGER', 'CASHIER'] })
  @IsOptional()
  @IsEnum(['ADMIN', 'MANAGER', 'CASHIER'])
  role?: 'ADMIN' | 'MANAGER' | 'CASHIER';
}

export class LoginDto {
  @ApiProperty({ example: "john123" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "1234", description: "4-digit PIN" })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  pin: string;
}
