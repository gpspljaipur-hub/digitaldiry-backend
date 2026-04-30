import { Controller, Post, Body } from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post('apply')
  apply(@Body() body: any) {
    return this.leaveService.applyLeave(body);
  }

  @Post('list')
  get(@Body('studentId') studentId: string) {
    return this.leaveService.getLeaves(studentId);
  }
}
