import { Controller, Get, Render } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Render('index.pug')
  async root() {
    const users = await this.userService.findAll();
    return {
      users,
    };
  }
}
