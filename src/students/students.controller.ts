import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('add')
  addStudent(@Body() body: any) {
    return this.studentsService.addStudent(
      body.name,
      body.className,
      body.teacherId,
    );
  }

  @Post('list')
  getStudents(@Body('teacherId') teacherId: string) {
    return this.studentsService.getStudents(teacherId);
  }
}
