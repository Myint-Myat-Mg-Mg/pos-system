import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create_shift.dto';
import { UpdateShiftDto } from './dto/update_shift.dto';
import { CashierPerformanceDto } from './dto/cashier_performance';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    create(createShiftDto: CreateShiftDto): Promise<{
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
    update(id: string, updateShiftDto: UpdateShiftDto): Promise<{
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
    getShiftPerformance(shiftId: string): Promise<CashierPerformanceDto>;
    getCashierPerformance(cashierId: string, startDate: string, endDate: string): Promise<CashierPerformanceDto[]>;
    getDailyPerformance(date: string): Promise<CashierPerformanceDto[]>;
}
