import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllProducts(): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProductById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProduct(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findProductByBarcode(barcode: string): Promise<{
        id: string;
        name: string;
        price: number;
        stock: number;
        barcode: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
