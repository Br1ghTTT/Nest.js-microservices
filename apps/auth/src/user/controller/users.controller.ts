import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from '../models/dto/create-user.request';
import { UsersService } from '../service/users.service';

@Controller('auth/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
