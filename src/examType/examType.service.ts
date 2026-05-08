import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamType, ExamTypeDocument } from './schema/examType.schema';

@Injectable()
export class ExamTypeService {
  constructor(
    @InjectModel(ExamType.name)
    private examTypeModel: Model<ExamTypeDocument>,
  ) {}

  async addExamType(name: string) {
    if (!name) {
      throw new BadRequestException('Exam type name required');
    }

    const exist = await this.examTypeModel.findOne({ name });

    if (exist) {
      return { message: 'Exam type already exists', data: exist };
    }

    return this.examTypeModel.create({ name });
  }

  async getExamTypes() {
    return this.examTypeModel.find().sort({ createdAt: -1 });
  }
}
