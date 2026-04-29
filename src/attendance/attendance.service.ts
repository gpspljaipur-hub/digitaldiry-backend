import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async markAttendance(data: any) {
    const { studentId, teacherId, status, date } = data;

    const exists = await this.attendanceModel.findOne({
      studentId,
      date,
    });

    if (exists) {
      return this.attendanceModel.findOneAndUpdate(
        { studentId, date },
        { status },
        { new: true },
      );
    }

    return this.attendanceModel.create({
      studentId: new Types.ObjectId(studentId),
      teacherId: new Types.ObjectId(teacherId),
      status,
      date,
    });
  }

  //   async getAttendance(teacherId: string, date: string) {
  //     return this.attendanceModel
  //       .find({
  //         teacherId: new Types.ObjectId(teacherId),
  //         date,
  //       })
  //       .populate('studentId', 'name className');
  //   }
  //   async getAttendance(teacherId: string, date: string) {
  //     console.log('INPUT 👉', teacherId, date);

  //     const data = await this.attendanceModel.find();
  //     console.log('DB DATA 👉', data);

  //     return data;
  //   }
  async getAttendance(teacherId: string, date: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.attendanceModel
      .find({
        teacherId: new Types.ObjectId(teacherId),
        date: { $gte: start, $lte: end },
      })
      .populate({
        path: 'studentId',
        select: 'name className', // ✅ student info
      })
      .populate({
        path: 'teacherId',
        select: 'name email schoolName', // ✅ teacher info
      });
  }
}
