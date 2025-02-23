import { ShiftStatus } from '@prisma/client';
export declare class CreateShiftDto {
    cashierId: string;
    startCash: number;
    startTime: Date;
    endTime?: Date;
    status: ShiftStatus;
}
