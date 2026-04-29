import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schema/student.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {}

  // ➕ ADD STUDENT
  async addStudent(name: string, className: string, teacherId: string) {
    return this.studentModel.create({
      name,
      className,
      teacherId: new Types.ObjectId(teacherId),
    });
  }

  // GET STUDENTS BY TEACHER
  async getStudents(teacherId: string) {
    return this.studentModel.find({
      teacherId: new Types.ObjectId(teacherId),
    });
  }
}
