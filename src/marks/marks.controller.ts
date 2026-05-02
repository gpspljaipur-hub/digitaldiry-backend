import { Controller, Post, Body } from '@nestjs/common';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Post('add')
  add(@Body() body: any) {
    return this.marksService.addMarks(body);
  }

  @Post('list')
  getMarks(@Body() body: any) {
    return this.marksService.getMarks(
      body.classId,
      body.studentId,
      body.subjectId,
    );
  }
}
