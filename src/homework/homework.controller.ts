import { Controller, Post, Body } from '@nestjs/common';
import { HomeworkService } from './homework.service';

@Controller('homework')
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @Post('add')
  add(@Body() body: any) {
    return this.homeworkService.addHomework(body);
  }

  @Post('list')
  get(@Body() body: any) {
    return this.homeworkService.getHomework(body.classId, body.subjectId);
  }
}
