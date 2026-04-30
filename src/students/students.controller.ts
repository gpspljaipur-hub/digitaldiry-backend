import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('add')
  addStudent(@Body() body: any) {
    return this.studentsService.addStudent({
      name: body.name,
      classId: body.classId, // ✅ changed
      teacherId: body.teacherId,
    });
  }

  @Post('list')
  getStudents(@Body('teacherId') teacherId: string) {
    return this.studentsService.getStudents(teacherId);
  }

  @Post('list-by-class')
  getStudentsByClass(@Body() body: any) {
    console.log('BODY 👉', body);

    return this.studentsService.getStudentsByClass(body.classId);
  }
}
