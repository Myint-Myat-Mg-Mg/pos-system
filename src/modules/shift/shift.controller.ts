import { Controller, Post, Body, Put, Param, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create_shift.dto';
import { UpdateShiftDto } from './dto/update_shift.dto';
import { CashierPerformanceDto } from './dto/cashier_performance';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { UserRole } from '@prisma/client';

@ApiTags('Shifts')
@Controller('shifts')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shift' })
  @ApiResponse({ status: 201, description: 'Shift created successfully' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update an existing shift' })
  @ApiResponse({ status: 200, description: 'Shift updated successfully' })
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftService.update(id, updateShiftDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get all shifts' })
  @ApiResponse({ status: 200, description: 'List of all shifts' })
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get shift by ID' })
  @ApiResponse({ status: 200, description: 'Shift found' })
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(id);
  }

  @Get(':shiftId/performance')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get cashier performance for a specific shift' })
  @ApiParam({ name: 'shiftId', description: 'ID of the shift' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns cashier performance for the shift',
    type: CashierPerformanceDto 
  })
  async getShiftPerformance(@Param('shiftId') shiftId: string) {
    return this.shiftService.getCashierPerformance(shiftId);
  }

  @Get('cashier/:cashierId/performance')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get cashier performance by date range' })
  @ApiParam({ name: 'cashierId', description: 'ID of the cashier' })
  @ApiQuery({ 
    name: 'startDate', 
    required: true, 
    description: 'Start date (YYYY-MM-DD)',
    example: '2025-02-21' 
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: true, 
    description: 'End date (YYYY-MM-DD)',
    example: '2025-02-22' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns cashier performance for date range',
    type: [CashierPerformanceDto] 
  })
  async getCashierPerformance(
    @Param('cashierId') cashierId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.shiftService.getCashierPerformanceByDateRange(
      cashierId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('daily-performance')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get daily performance for all cashiers' })
  @ApiQuery({ 
    name: 'date', 
    required: true, 
    description: 'Date to get performance (YYYY-MM-DD)',
    example: '2025-02-21' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns daily performance for all cashiers',
    type: [CashierPerformanceDto] 
  })
  async getDailyPerformance(@Query('date') date: string) {
    return this.shiftService.getDailyCashierPerformance(new Date(date));
  }
}
