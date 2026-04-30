import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from './schema/school.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name)
    private schoolModel: Model<SchoolDocument>,
  ) {}

  async addSchool(name: string) {
    if (!name) {
      throw new BadRequestException('School name required');
    }

    const exist = await this.schoolModel.findOne({ name });

    if (exist) {
      return { message: 'School already exists', data: exist };
    }

    return this.schoolModel.create({ name });
  }

  async getSchools() {
    return this.schoolModel.find().sort({ createdAt: -1 });
  }
}
