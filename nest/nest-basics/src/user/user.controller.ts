import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get()
  getAllUsers() {
    return this.userServices.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userServices.getUserById(id);
  }

  @Get('data/:userId')
  getUserName(@Param('userId', ParseIntPipe) userId: number) {
    return this.userServices.getWelcomeMessage(userId);
  }
}
