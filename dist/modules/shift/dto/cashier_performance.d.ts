export declare class CashierPerformanceDto {
    cashierId: string;
    cashierName: string;
    shiftId: string;
    startTime: Date;
    endTime: Date | null;
    hoursWorked: number;
    totalSales: number;
    totalOrders: number;
    averageSalePerHour: number;
    totalVouchers: number;
}
