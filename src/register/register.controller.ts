import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('add')
  add(@Body() body: any) {
    return this.registerService.createRegister(body);
  }

  @Post('get')
  get(@Body('mobile') mobile: string) {
    return this.registerService.getRegister(mobile);
  }

  @Post('update')
  update(@Body() body: any) {
    return this.registerService.updateProfile(body);
  }
}
