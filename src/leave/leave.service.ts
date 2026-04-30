import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Leave, LeaveDocument } from './schema/leave.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name)
    private leaveModel: Model<LeaveDocument>,
  ) {}

  async applyLeave(data: any) {
    const { studentId, startDate, endDate, message } = data;

    if (!studentId || !startDate || !endDate || !message) {
      throw new BadRequestException('All fields required');
    }

    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Invalid studentId');
    }

    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('Start date must be before end date');
    }

    return this.leaveModel.create({
      studentId: new Types.ObjectId(studentId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      message,
    });
  }

  async getLeaves(studentId: string) {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Invalid studentId');
    }

    const leaves = await this.leaveModel
      .find({
        studentId: new Types.ObjectId(studentId),
      })
      .populate('studentId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return leaves.map((item: any) => ({
      _id: item._id,
      studentId: item.studentId?._id || null,
      studentName: item.studentId?.name || null, // ✅ name aa jayega
      startDate: item.startDate,
      endDate: item.endDate,
      message: item.message,
      status: item.status,
    }));
  }
}
