import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post('add')
  addTeacher(@Body() body: any) {
    return this.teachersService.addTeacher(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.teachersService.loginTeacher(body.email, body.password);
  }

  @Get('all')
  getTeachers() {
    return this.teachersService.getTeachers();
  }
}
