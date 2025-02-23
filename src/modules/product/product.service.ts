import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
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

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async findProductByBarcode(barcode: string) {
    const product = await this.prisma.product.findUnique({
      where: { barcode },
    });
  
    if (!product) {
      throw new NotFoundException('Product not found with this barcode');
    }
  
    return product;
  }
  
}
