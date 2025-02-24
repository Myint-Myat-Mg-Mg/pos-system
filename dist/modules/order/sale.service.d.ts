import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create_sale.dto';
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(createOrderDto: CreateOrderDto, sellerId: string): Promise<{
        seller: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            name: string;
            pin: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
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
            discount: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            amount: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllSales(): Promise<({
        orderItems: {
            id: string;
            discount: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            amount: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getSaleById(id: string): Promise<{
        orderItems: {
            id: string;
            discount: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            amount: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        customerId: string | null;
        sellerId: string;
        shiftId: string | null;
        totalAmount: number;
        discount: number;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reprintReceipt(id: string): Promise<{
        message: string;
        sale: {
            orderItems: {
                id: string;
                discount: number;
                createdAt: Date;
                updatedAt: Date;
                quantity: number;
                price: number;
                amount: number;
                productId: string;
                orderId: string;
            }[];
        } & {
            id: string;
            customerId: string | null;
            sellerId: string;
            shiftId: string | null;
            totalAmount: number;
            discount: number;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
