import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateOrderDto } from '../models/dtos/create-order.dto';
import { Order } from '../models/schemas/order.schema';
import { OrdersRepository } from '../repositories/orders.repository';
import { BILLING_SERVICE } from '../constants/services.constants';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class OrdersService {

    constructor(private readonly orderRepository: OrdersRepository,
                @Inject(BILLING_SERVICE) private billingClient: ClientProxy) {
    }

    async createOrder(orderToCreate: CreateOrderDto, auth: string): Promise<Order> {
        const session = await this.orderRepository.startTransaction();
        try {
            const order = await this.orderRepository.create(orderToCreate, { session });
            await lastValueFrom(
                this.billingClient.emit('order_created', { orderToCreate, Authentication: auth }),
            );
            await session.commitTransaction();
            return order;
        } catch (e) {
            await session.abortTransaction();
            throw e;
        }
    }

    async getOrders(): Promise<Order[]> {
        return this.orderRepository.find({});

    }
}
