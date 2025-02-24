import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    getProduct(id: string): Promise<{
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
    findByBarcode(barcode: string): Promise<{
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
