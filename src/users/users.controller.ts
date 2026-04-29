import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('send-otp')
  sendOtp(@Body('phone') phone: string) {
    return this.usersService.sendOtp(phone);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: any) {
    return this.usersService.verifyOtp(body.phone, body.otp);
  }
}
