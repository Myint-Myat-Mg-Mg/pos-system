import { PrismaService } from 'src/prisma/prisma.service';
export declare class VoucherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateVoucher(saleId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cashierId: string;
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
    }>;
    getVoucherById(id: string): Promise<{
        voucherItems: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            price: number;
            discount: number;
            total: number;
            voucherId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cashierId: string;
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
    }>;
}
