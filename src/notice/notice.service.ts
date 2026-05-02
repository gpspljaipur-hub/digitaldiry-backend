import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from './schema/notice.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name)
    private noticeModel: Model<NoticeDocument>,
  ) {}

  // ADD NOTICE
  // async addNotice(data: any) {
  //   const { title, classId, message, status } = data;

  //   if (!title || !classId || !message) {
  //     throw new BadRequestException('All fields required');
  //   }

  //   return this.noticeModel.create({
  //     title,
  //     classId: new Types.ObjectId(classId),
  //     message,
  //     status: status || 'normal',
  //   });
  // }

  async addNotice(data: any) {
    const { title, classId, message, status } = data;

    if (!title || !classId || !message) {
      throw new BadRequestException('All fields required');
    }

    const classIds = classId.map((id: string) => new Types.ObjectId(id));

    return this.noticeModel.create({
      title,
      classId: classIds,
      message,
      status: status || 'normal',
    });
  }

  // GET NOTICE (class-wise)
  async getNotices(classId: string) {
    return this.noticeModel
      .find({
        classId: new Types.ObjectId(classId),
      })
      .populate('classId', 'name')
      .sort({ createdAt: -1 });
  }
}
