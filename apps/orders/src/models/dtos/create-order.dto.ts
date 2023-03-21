import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({ description: 'order name' })
    @IsString()
    name: string;
    @ApiProperty({ description: 'order price' })
    @IsNumber()
    price: number;
    @ApiProperty({ description: 'order phone number' })
    @IsString()
    phoneNumber: string;
}