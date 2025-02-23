import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: "Product 1" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1000 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'ABC123' })
  @IsString()
  @IsOptional()
  barcode?: string;
}
