import { PaymentType } from '@prisma/client';
export declare class CreatePaymentDto {
    orderId: string;
    cashierId: string;
    totalAmount: number;
    discount: number;
    tax: number;
    finalAmount: number;
    paidAmount: number;
    changeAmount: number;
    paymentMethod: PaymentType;
}
