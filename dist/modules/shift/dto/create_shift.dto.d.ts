import { ShiftStatus } from '@prisma/client';
export declare class CreateShiftDto {
    cashierId: string;
    startCash: number;
    status: ShiftStatus;
}
