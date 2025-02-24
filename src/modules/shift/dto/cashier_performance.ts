import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CashierPerformanceDto {
    @ApiProperty()
    @IsString()
    cashierId: string;
  
    @ApiProperty()
    @IsString()
    cashierName: string;
  
    @ApiProperty()
    @IsString()
    shiftId: string;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startTime: Date;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endTime: Date | null;
  
    @ApiProperty()
    @IsNumber()
    hoursWorked: number;
  
    @ApiProperty()
    @IsNumber()
    totalSales: number;
  
    @ApiProperty()
    @IsNumber()
    totalOrders: number;
  
    @ApiProperty()
    @IsNumber()
    averageSalePerHour: number;
  
    @ApiProperty()
    @IsNumber()
    totalVouchers: number;
  }