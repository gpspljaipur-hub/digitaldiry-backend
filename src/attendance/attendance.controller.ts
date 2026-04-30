import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('mark')
  mark(@Body() body: any) {
    return this.attendanceService.markAttendance(body);
  }

  @Post('list')
  get(@Body() body: any) {
    return this.attendanceService.getAttendance(body.teacherId, body.date);
  }

  @Post('student-monthly')
  getMonthly(@Body() body: any) {
    return this.attendanceService.getStudentMonthlyAttendance(
      body.studentId,
      body.month,
      body.year,
    );
  }
}
