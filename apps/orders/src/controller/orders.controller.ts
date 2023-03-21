import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@app/common';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto } from '../models/dtos/create-order.dto';
import { Order } from '../models/schemas/order.schema';


@Controller('order')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(
        @Body() createOrderRequest: CreateOrderDto,
        @Req() req: any,
    ): Promise<Order> {
        return this.ordersService.createOrder(createOrderRequest, req.cookies?.Authentication);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getOrders(): Promise<Order[]> {
        return this.ordersService.getOrders();
    }
}
