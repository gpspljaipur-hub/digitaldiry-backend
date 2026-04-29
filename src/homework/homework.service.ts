import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Homework, HomeworkDocument } from './schema/homework.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(Homework.name)
    private homeworkModel: Model<HomeworkDocument>,
  ) {}

  //  ADD HOMEWORK
  async addHomework(data: any) {
    const { classId, subjectId, message, date } = data;

    if (!classId || !subjectId || !message || !date) {
      throw new BadRequestException('All fields required');
    }

    return this.homeworkModel.create({
      classId: new Types.ObjectId(classId),
      subjectId: new Types.ObjectId(subjectId),
      message,
      date: new Date(date),
    });
  }

  //  GET HOMEWORK (class + subject wise)
  async getHomework(classId: string, subjectId?: string) {
    const filter: any = {
      classId: new Types.ObjectId(classId),
    };

    if (subjectId) {
      filter.subjectId = new Types.ObjectId(subjectId);
    }

    return this.homeworkModel
      .find(filter)
      .populate('classId', 'name')
      .populate('subjectId', 'name')
      .sort({ date: -1 });
  }
}
