import { Controller, Post, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { UserRole } from '@prisma/client';

@Controller('vouchers')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('generate/:saleId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'Generate a receipt after payment' })
  @ApiResponse({ status: 201, description: 'Receipt generated successfully.' })
  async generateVoucher(@Param('saleId') saleId: string) {
    return this.voucherService.generateVoucher(saleId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  @ApiOperation({ summary: 'Get receipt details' })
  @ApiResponse({ status: 200, description: 'Receipt fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Receipt not found' })
  async getVoucher(@Param('id') id: string) {
    const voucher = await this.voucherService.getVoucherById(id);
    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }
    return voucher;
  }
}
