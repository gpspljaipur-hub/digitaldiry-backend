import { Controller, Post, Body, Get } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post('add')
  add(@Body('name') name: string) {
    return this.schoolService.addSchool(name);
  }

  @Get('list')
  get() {
    return this.schoolService.getSchools();
  }
}
