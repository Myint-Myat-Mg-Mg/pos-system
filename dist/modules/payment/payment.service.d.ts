import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create_payment.dto';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPayment(dto: CreatePaymentDto): Promise<{
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
    getPaymentById(id: string): Promise<{
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
