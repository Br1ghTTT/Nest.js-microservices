import { Controller, Get, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { JwtAuthGuard, RmqService } from '@app/common';
import { BillingService } from '../service/billing.service';
import { CreateOrderDto } from '../../../orders/src/models/dtos/create-order.dto';


@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService,
                private readonly rmqService: RmqService) {
    }

    @Get()
    getHello(): string {
        return this.billingService.getHello();
    }

    @EventPattern('order_created')
    @UseGuards(JwtAuthGuard)
    async handlerOrderCreation(@Payload() orderData: CreateOrderDto, @Ctx() context: RmqContext) {
        await this.billingService.bill(orderData);
        this.rmqService.ack(context);
    }

}