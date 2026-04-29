import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schema/teacher.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<Teacher>,
  ) {}

  async addTeacher(data: any) {
    const { name, email, schoolName, password, subject } = data;

    const exists = await this.teacherModel.findOne({ email });
    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.teacherModel.create({
      name,
      email,
      schoolName,
      password: hashedPassword,
      subject,
    });
  }

  async loginTeacher(email: string, password: string) {
    const teacher = await this.teacherModel.findOne({ email });

    if (!teacher) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      message: 'Login successful',
      teacher,
    };
  }

  async getTeachers() {
    return this.teacherModel.find();
  }
}
