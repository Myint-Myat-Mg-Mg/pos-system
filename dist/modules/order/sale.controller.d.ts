import { SaleService } from './sale.service';
import { CreateOrderDto } from './dto/create_sale.dto';
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<{
        shift: {
            id: string;
            createdAt: Date;
            cashierId: string;
            startTime: Date;
            endTime: Date | null;
            startCash: number;
            endCash: number | null;
            totalSales: number;
            status: import(".prisma/client").$Enums.ShiftStatus;
        } | null;
        orderItems: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            price: number;
            discount: number;
            amount: number;
            orderId: string;
        }[];
        seller: {
            username: string;
            pin: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
    }>;
    getAllSales(): Promise<({
        orderItems: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            price: number;
            discount: number;
            amount: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
    })[]>;
    getOrder(id: string): Promise<{
        orderItems: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            price: number;
            discount: number;
            amount: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
    }>;
    reprintReceipt(id: string): Promise<{
        message: string;
        sale: {
            orderItems: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                quantity: number;
                price: number;
                discount: number;
                amount: number;
                orderId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            customerId: string | null;
            sellerId: string;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
        };
    }>;
}
