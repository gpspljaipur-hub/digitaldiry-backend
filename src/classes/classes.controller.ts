import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Post('add')
  add(@Body('name') name: string) {
    return this.classesService.addClass(name);
  }

  @Get('all')
  get() {
    return this.classesService.getClasses();
  }
}
