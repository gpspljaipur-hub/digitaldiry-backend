import { Controller, Post, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('add')
  add(@Body() body: any) {
    return this.noticeService.addNotice(body);
  }

  @Post('list')
  get(@Body('classId') classId: string) {
    return this.noticeService.getNotices(classId);
  }
}
