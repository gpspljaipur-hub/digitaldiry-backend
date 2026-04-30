// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Student } from './schema/student.schema';
// import { Model, Types } from 'mongoose';

// @Injectable()
// export class StudentsService {
//   constructor(
//     @InjectModel(Student.name)
//     private studentModel: Model<StudentDocument>,
//   ) {}

//   // ➕ ADD STUDENT
//     async addStudent(data: any) {
//     const { name, classId, teacherId } = data;

//     if (!name || !classId || !teacherId) {
//       throw new BadRequestException("All fields required");
//     }

//     return this.studentModel.create({
//       name,
//       classId: new Types.ObjectId(classId),
//       teacherId: new Types.ObjectId(teacherId),
//     });
//   }

//   // GET STUDENTS BY TEACHER
//   async getStudents(teacherId: string) {
//     return this.studentModel.find({
//       teacherId: new Types.ObjectId(teacherId),
//     });
//   }
//   async getStudentsByClass(classId: string) {
//     return this.studentModel.find({
//       classId: new Types.ObjectId(classId),
//     });
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schema/student.schema';
import { Model, Types } from 'mongoose';
import { log } from 'node:console';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async addStudent(data: any) {
    const { name, classId, teacherId } = data;

    if (!name || !classId || !teacherId) {
      throw new BadRequestException('All fields required');
    }

    return this.studentModel.create({
      name,
      classId: new Types.ObjectId(classId),
      teacherId: new Types.ObjectId(teacherId),
    });
  }
  async getStudents(teacherId: string) {
    return this.studentModel.find({
      teacherId: new Types.ObjectId(teacherId),
    });
  }
  async getStudentsByClass(classId: string) {
    const students = await this.studentModel.find({
      classId: new Types.ObjectId(classId),
    });
    return students;
  }
}
