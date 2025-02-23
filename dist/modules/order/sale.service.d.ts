import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create_sale.dto';
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(createOrderDto: CreateOrderDto, sellerId: string): Promise<{
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
    getSaleById(id: string): Promise<{
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
