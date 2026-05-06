import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Post('add')
  add(@Body() body: any) {
    return this.complaintService.createComplaint(body);
  }

  @Get('list')
  get() {
    return this.complaintService.getComplaints();
  }

  @Post('student')
  getStudentComplaints(@Body() body: any) {
    return this.complaintService.getStudentComplaints(body);
  }
}
