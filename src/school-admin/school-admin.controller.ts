import { Controller, Post, Body, Get } from '@nestjs/common';
import { SchoolAdminService } from './school-admin.service';

@Controller('admin')
export class SchoolAdminController {
  constructor(private readonly service: SchoolAdminService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.service.createAdmin(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.service.login(body);
  }

  @Get('list')
  getAll() {
    return this.service.getAdmins();
  }
}
