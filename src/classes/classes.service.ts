import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassModel } from './schema/class.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(ClassModel.name)
    private classModel: Model<ClassModel>,
  ) {}

  //  ADD CLASS
  async addClass(name: string) {
    const exists = await this.classModel.findOne({ name });

    if (exists) {
      throw new BadRequestException('Class already exists');
    }

    return this.classModel.create({ name });
  }

  //  GET CLASSES
  async getClasses() {
    return this.classModel.find();
  }
}
