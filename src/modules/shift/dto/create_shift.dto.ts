import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { ShiftStatus } from '@prisma/client'; 

export class CreateShiftDto {
  @ApiProperty({ example: '201a15f4-4984-4e4d-b37d-1a1c04685cc6', description: 'ID of the cashier' })
  @IsString()
  cashierId: string;

  @ApiProperty({ example: 10000.0, description: 'Initial cash amount at the start of the shift' })
  @IsNumber()
  startCash: number;

  @ApiProperty({ example: 'ONGOING', description: 'Status of the shift', enum: ShiftStatus, default: ShiftStatus.ONGOING })
  @IsEnum(ShiftStatus)
  status: ShiftStatus = ShiftStatus.ONGOING;
}
