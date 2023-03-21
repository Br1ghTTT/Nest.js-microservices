import { Injectable, Logger } from '@nestjs/common';

import { CreateOrderDto } from '../../../orders/src/models/dtos/create-order.dto';

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);

    getHello(): string {
        return 'Hello World!';
    }

    async bill(orderData: CreateOrderDto) {
        this.logger.log('Billing.....', orderData);
    }
}

