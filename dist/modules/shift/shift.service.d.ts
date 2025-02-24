import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShiftDto } from './dto/create_shift.dto';
import { UpdateShiftDto } from './dto/update_shift.dto';
import { CashierPerformanceDto } from './dto/cashier_performance';
export declare class ShiftService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateShiftDto): Promise<{
        cashier: {
            id: string;
            createdAt: Date;
            name: string;
            username: string;
            pin: string;
            role: import(".prisma/client").$Enums.UserRole;
            updatedAt: Date;
        };
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string | null;
            sellerId: string;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
            paymentType: import(".prisma/client").$Enums.PaymentType;
        }[];
        vouchers: {
            id: string;
            cashierId: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string | null;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
            voucherNumber: string;
            orderId: string | null;
            tax: number;
            finalAmount: number;
            paidAmount: number;
            changeAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentType;
        }[];
    } & {
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
    endShift(shiftId: string): Promise<{
        cashier: {
            id: string;
            createdAt: Date;
            name: string;
            username: string;
            pin: string;
            role: import(".prisma/client").$Enums.UserRole;
            updatedAt: Date;
        };
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string | null;
            sellerId: string;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
            paymentType: import(".prisma/client").$Enums.PaymentType;
        }[];
        vouchers: {
            id: string;
            cashierId: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string | null;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
            voucherNumber: string;
            orderId: string | null;
            tax: number;
            finalAmount: number;
            paidAmount: number;
            changeAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentType;
        }[];
    } & {
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
    getActiveShift(cashierId: string): Promise<{
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
    getDailyCashierPerformance(date: Date): Promise<CashierPerformanceDto[]>;
}
