import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    getProduct(id: string): Promise<{
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
    findByBarcode(barcode: string): Promise<{
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
