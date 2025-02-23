import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShiftDto } from './dto/create_shift.dto';
import { UpdateShiftDto } from './dto/update_shift.dto';
import { CashierPerformanceDto } from './dto/cashier_performance';
export declare class ShiftService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateShiftDto): Promise<{
        id: string;
        cashierId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: number;
        endCash: number | null;
        totalSales: number;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateShiftDto): Promise<{
        id: string;
        cashierId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: number;
        endCash: number | null;
        totalSales: number;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        cashierId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: number;
        endCash: number | null;
        totalSales: number;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        cashierId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: number;
        endCash: number | null;
        totalSales: number;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdAt: Date;
    }>;
    getCashierPerformance(shiftId: string): Promise<CashierPerformanceDto>;
    getCashierPerformanceByDateRange(cashierId: string, startDate: Date, endDate: Date): Promise<CashierPerformanceDto[]>;
    getDailyCashierPerformance(date: Date): Promise<CashierPerformanceDto[]>;
}
