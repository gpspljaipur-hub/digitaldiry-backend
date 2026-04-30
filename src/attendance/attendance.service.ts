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
    const { teacherId, date, students } = data;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const operations = students.map((student: any) => ({
      updateOne: {
        filter: {
          studentId: new Types.ObjectId(student.studentId),
          date: { $gte: start, $lte: end },
        },
        update: {
          studentId: new Types.ObjectId(student.studentId),
          teacherId: new Types.ObjectId(teacherId),
          status: student.status,
          date: new Date(date),
        },
        upsert: true,
      },
    }));

    // ✅ bulk write
    await this.attendanceModel.bulkWrite(operations);

    // ✅ fetch with student + teacher
    const result = await this.attendanceModel
      .find({
        teacherId: new Types.ObjectId(teacherId),
        date: { $gte: start, $lte: end },
      })
      .populate({
        path: 'studentId',
        select: 'name className',
      })
      .populate({
        path: 'teacherId',
        select: 'name', // ✅ teacher name
      });

    return result;
  }
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
        select: 'name className',
      })
      .populate({
        path: 'teacherId',
        select: 'name email schoolName',
      });
  }

  async getStudentMonthlyAttendance(
    studentId: string,
    month: string,
    year: number,
  ) {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new Error('Invalid studentId');
    }
    const monthMap: any = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const monthIndex = monthMap[month.toLowerCase()];

    if (monthIndex === undefined) {
      throw new Error('Invalid month');
    }

    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0, 23, 59, 59);

    const result = await this.attendanceModel.aggregate([
      {
        $match: {
          studentId: new Types.ObjectId(studentId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    let present = 0;
    let absent = 0;

    result.forEach((item) => {
      if (item._id === 'present') present = item.count;
      if (item._id === 'absent') absent = item.count;
    });

    const records = await this.attendanceModel.find({
      studentId: new Types.ObjectId(studentId),
      date: { $gte: start, $lte: end },
    });

    return {
      studentId,
      month,
      year,
      totalPresent: present,
      totalAbsent: absent,
      totalDays: present + absent,
      records,
    };
  }
}
