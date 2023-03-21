import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { Order, OrderSchema } from './models/schemas/order.schema';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersController } from './controller/orders.controller';
import { BILLING_SERVICE } from './constants/services.constants';
import { OrdersService } from './service/orders.service';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
            envFilePath: './apps/orders/.env',
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        RmqModule.register({
            name: BILLING_SERVICE,
        }),
        AuthModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {
}
