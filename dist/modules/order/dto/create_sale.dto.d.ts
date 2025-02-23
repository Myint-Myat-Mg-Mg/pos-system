import { PaymentType } from '@prisma/client';
export declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    orderItems: CreateOrderItemDto[];
    paymentType: PaymentType;
}
