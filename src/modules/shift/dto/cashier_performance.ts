import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

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
    startTime: Date;
  
    @ApiProperty()
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