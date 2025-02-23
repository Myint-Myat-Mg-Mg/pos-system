import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }>;
    getAllProducts(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }[]>;
    getProductById(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }>;
    deleteProduct(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }>;
    findProductByBarcode(barcode: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
    }>;
}
