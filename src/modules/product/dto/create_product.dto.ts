import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: "Product 1" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1000 })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: "ABC123" })
  @IsString()
  @IsOptional()
  barcode?: string;
}
