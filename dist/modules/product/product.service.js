"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(createProductDto) {
        const { name, price, stock, barcode } = createProductDto;
        const existingProduct = await this.prisma.product.findUnique({
            where: { barcode },
        });
        if (existingProduct) {
            throw new Error('Product with this barcode already exists');
        }
        return this.prisma.product.create({
            data: { name, price, stock, barcode },
        });
    }
    async getAllProducts() {
        return this.prisma.product.findMany({
            where: { isDeleted: false },
        });
    }
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id, isDeleted: false },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id, isDeleted: false },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }
    async deleteProduct(id) {
        const product = await this.prisma.product.findUnique({
            where: { id, isDeleted: false },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        try {
            return await this.prisma.product.update({
                where: { id },
                data: { isDeleted: true },
            });
        }
        catch (error) {
            throw new Error('Failed to delete product');
        }
    }
    async findProductByBarcode(barcode) {
        const product = await this.prisma.product.findUnique({
            where: { barcode, isDeleted: false },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found with this barcode');
        }
        return product;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map