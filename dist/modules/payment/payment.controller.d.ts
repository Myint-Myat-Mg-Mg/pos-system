import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create_payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<{
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
    getPayment(id: string): Promise<{
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
