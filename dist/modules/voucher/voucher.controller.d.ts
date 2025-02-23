import { VoucherService } from './voucher.service';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
    generateVoucher(saleId: string): Promise<{
        id: string;
        voucherNumber: string;
        orderId: string | null;
        cashierId: string;
        customerId: string | null;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
        tax: number;
        finalAmount: number;
        paidAmount: number;
        changeAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getVoucher(id: string): Promise<{
        voucherItems: {
            id: string;
            discount: number;
            createdAt: Date;
            productId: string;
            quantity: number;
            price: number;
            total: number;
            voucherId: string;
        }[];
    } & {
        id: string;
        voucherNumber: string;
        orderId: string | null;
        cashierId: string;
        customerId: string | null;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
        tax: number;
        finalAmount: number;
        paidAmount: number;
        changeAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentType;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
