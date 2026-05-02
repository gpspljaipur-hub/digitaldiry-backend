import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register, RegisterDocument } from './schema/register.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name)
    private registerModel: Model<RegisterDocument>,

    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createRegister(data: any) {
    const {
      mobile,
      parentName,
      studentFullName,
      classId,
      schoolId,
      relationId,
      studentId,
      email,
      address,
    } = data;

    if (
      !mobile ||
      !parentName ||
      !studentFullName ||
      !classId ||
      !schoolId ||
      !relationId
    ) {
      throw new BadRequestException('All fields required');
    }

    const normalizedPhone = mobile.replace(/\D/g, '').slice(-10);

    const register = await this.registerModel.create({
      mobile: normalizedPhone,
      parentName,
      studentFullName,
      classId: new Types.ObjectId(classId),
      schoolId: new Types.ObjectId(schoolId),
      relationId: new Types.ObjectId(relationId),
      studentId,
      email,
      address,
    });

    await this.userModel.findOneAndUpdate(
      { phone: normalizedPhone },
      {
        isRegistered: true,
      },
    );

    return register;
  }

  async getRegister(mobile: string) {
    return this.registerModel
      .findOne({ mobile })
      .populate('classId', 'name')
      .populate('schoolId', 'name')
      .populate('relationId', 'name');
  }

  async updateProfile(data: any) {
    const {
      mobile,
      parentName,
      studentFullName,
      classId,
      schoolId,
      relationId,
      studentId,
      email,
      address,
    } = data;

    if (!mobile) {
      throw new BadRequestException('mobile required');
    }

    const normalizedPhone = mobile.replace(/\D/g, '').slice(-10);

    const existing = await this.registerModel.findOne({
      mobile: normalizedPhone,
    });

    if (!existing) {
      throw new BadRequestException('Profile not found');
    }

    const updateData: any = {};

    if (parentName) updateData.parentName = parentName;
    if (studentFullName) updateData.studentFullName = studentFullName;
    if (classId) updateData.classId = new Types.ObjectId(classId);
    if (schoolId) updateData.schoolId = new Types.ObjectId(schoolId);
    if (relationId) updateData.relationId = new Types.ObjectId(relationId);
    if (studentId) updateData.studentId = studentId;
    if (email) updateData.email = email;
    if (address) updateData.address = address;

    const updated = await this.registerModel
      .findOneAndUpdate({ mobile: normalizedPhone }, updateData, { new: true })
      .populate('classId', 'name')
      .populate('schoolId', 'name')
      .populate('relationId', 'name');

    return updated;
  }
}
