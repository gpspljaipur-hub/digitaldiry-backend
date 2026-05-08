import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExamTypeService } from './examType.service';

@Controller('examType')
export class ExamTypeController {
  constructor(private examTypeService: ExamTypeService) {}

  @Post('add')
  add(@Body('name') name: string) {
    return this.examTypeService.addExamType(name);
  }

  @Get('list')
  get() {
    return this.examTypeService.getExamTypes();
  }
}
