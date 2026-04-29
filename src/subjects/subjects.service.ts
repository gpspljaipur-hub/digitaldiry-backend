import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schema/subject.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: Model<Subject>,
  ) {}

  // ➕ ADD SUBJECT (class wise)
  //   async addSubject(name: string, classId: string) {
  //     const exists = await this.subjectModel.findOne({
  //       name,
  //       classId: new Types.ObjectId(classId),
  //     });

  //     if (exists) {
  //       throw new BadRequestException('Subject already exists in this class');
  //     }

  //     return this.subjectModel.create({
  //       name,
  //       classId: new Types.ObjectId(classId),
  //     });
  //   }
  async addSubject(name: string, classId: string) {
    if (!Types.ObjectId.isValid(classId)) {
      throw new BadRequestException('Invalid classId');
    }

    return this.subjectModel.create({
      name,
      classId: new Types.ObjectId(classId),
    });
  }

  //  GET SUBJECTS BY CLASS
  async getSubjects(classId: string) {
    return this.subjectModel
      .find({
        classId: new Types.ObjectId(classId),
      })
      .populate('classId', 'name'); // class name भी आएगा
  }
}
