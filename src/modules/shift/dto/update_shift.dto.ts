import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDate } from 'class-validator';
import { ShiftStatus } from '@prisma/client';

export class UpdateShiftDto {
  @ApiProperty({ example: '2025-02-18T17:00:00.000Z', description: 'Shift end time', required: false })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ example: 'COMPLETED', description: 'Updated status of the shift', enum: ShiftStatus, required: false })
  @IsOptional()
  @IsEnum(ShiftStatus)
  status?: ShiftStatus;
}
