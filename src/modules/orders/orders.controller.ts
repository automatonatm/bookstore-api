import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { JwtGuard } from '@app/core/guards';
import { GetUser } from '@app/core/decorators';

@ApiTags('Manage Orders')
@ApiBearerAuth('JWT-TOKEN')
@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/checkout')
  @ApiCreatedResponse({ status: 201, description: 'Create order.' })
  @HttpCode(201)
  public async createOrder(@GetUser('id') customerId: number) {
    return this.orderService.createOrder(customerId);
  }

  @Get('/my-orders')
  @ApiOkResponse({ status: 200, description: 'Get user orders.' })
  @HttpCode(200)
  public async getUserOrders(@GetUser('id') customerId: number) {
    return this.orderService.getUserOrders(customerId);
  }
}
