import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { ShiftStatus } from '@prisma/client'; 

export class CreateShiftDto {
  @ApiProperty({ example: '12345', description: 'ID of the cashier' })
  @IsString()
  cashierId: string;

  @ApiProperty({ example: 100.0, description: 'Initial cash amount at the start of the shift' })
  @IsNumber()
  startCash: number;

  @ApiProperty({ example: '2025-02-18T09:00:00.000Z', description: 'Shift start time' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ example: '2025-02-18T17:00:00.000Z', description: 'Shift end time', required: false })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ example: 'ONGOING', description: 'Status of the shift', enum: ShiftStatus })
  @IsEnum(ShiftStatus)
  status: ShiftStatus;
}
