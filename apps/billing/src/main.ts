import { NestFactory } from '@nestjs/core';

import { BillingModule } from './billing.module';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(BillingModule);

    const rmqService = app.get<RmqService>(RmqService);

    app.connectMicroservice(rmqService.getOptions('BILLING'));
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    await app.startAllMicroservices();
}

bootstrap();
