import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marks, MarksDocument } from './schema/marks.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class MarksService {
  constructor(
    @InjectModel(Marks.name)
    private marksModel: Model<MarksDocument>,
  ) {}

  async addMarks(data: any) {
    const { classId, subjectId, students } = data;

    if (!classId || !subjectId || !students?.length) {
      throw new BadRequestException('All fields required');
    }

    const operations = students.map((student: any) => ({
      updateOne: {
        filter: {
          studentId: new Types.ObjectId(student.studentId),
          subjectId: new Types.ObjectId(subjectId),
        },
        update: {
          classId: new Types.ObjectId(classId),
          subjectId: new Types.ObjectId(subjectId),
          studentId: new Types.ObjectId(student.studentId),
          marks: student.marks,
        },
        upsert: true, // ✅ create or update
      },
    }));

    await this.marksModel.bulkWrite(operations);

    return this.marksModel
      .find({
        classId: new Types.ObjectId(classId),
        subjectId: new Types.ObjectId(subjectId),
      })
      .populate('studentId', 'name className')
      .populate('subjectId', 'name')
      .populate('classId', 'name');
  }

  async getMarks(classId: string, subjectId?: string) {
    const filter: any = {
      classId: new Types.ObjectId(classId),
    };

    if (subjectId) {
      filter.subjectId = new Types.ObjectId(subjectId);
    }

    const result = await this.marksModel
      .find(filter)
      .populate('studentId', 'name className')
      .populate('subjectId', 'name')
      .populate('classId', 'name')
      .sort({ createdAt: -1 });

    return result;
  }
}
