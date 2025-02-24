import { Controller, Post, Body, Get, Param, UseInterceptors, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SaleService } from './sale.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create_sale.dto';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('sales')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const sellerId = req.user.id || req.user.sub;
    
    if (!sellerId) {
      throw new BadRequestException('Invalid seller authentication.');
    }

    if (!Array.isArray(createOrderDto.orderItems)) {
      throw new BadRequestException('orderItems must be an array');
    }
  
    const validatedOrderItems = createOrderDto.orderItems.map(item => ({
      productId: item.productId,
      quantity: Number(item.quantity),
      price: Number(item.price)
    }));
  
    return this.saleService.createSale({
      ...createOrderDto,
      orderItems: validatedOrderItems
    }, sellerId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'List all sales with filters' })
  async getAllSales() {
    return this.saleService.getAllSales();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(@Param('id') id: string) {
    return this.saleService.getSaleById(id);
  }

  @Post('/reprint/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'Reprint receipt for a sale' })
  @ApiResponse({ status: 200, description: 'Receipt reprinted successfully.' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async reprintReceipt(@Param('id') id: string) {
    return this.saleService.reprintReceipt(id);
  }
}
