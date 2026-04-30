import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './schema/complaint.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<ComplaintDocument>,
  ) {}

  async createComplaint(data: any) {
    const { categoryId, message } = data;

    if (!categoryId || !message) {
      throw new BadRequestException('categoryId and message required');
    }

    if (!Types.ObjectId.isValid(categoryId)) {
      throw new BadRequestException('Invalid categoryId');
    }

    return this.complaintModel.create({
      categoryId: new Types.ObjectId(categoryId),
      message,
    });
  }

  async getComplaints() {
    const complaints = await this.complaintModel
      .find()
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return complaints.map((item: any) => ({
      _id: item._id,
      categoryId: item.categoryId?._id,
      categoryName: item.categoryId?.name,
      message: item.message,
      status: item.status,
      createdAt: item.createdAt,
    }));
  }
}
