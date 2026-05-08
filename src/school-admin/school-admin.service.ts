import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolAdmin, SchoolAdminDocument } from './schema/school-admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SchoolAdminService {
  constructor(
    @InjectModel(SchoolAdmin.name)
    private adminModel: Model<SchoolAdminDocument>,

    @InjectModel('School')
    private schoolModel: Model<any>,

    private jwtService: JwtService,
  ) {}
  async createAdmin(body: any) {
    const {
      mobile,
      firstName,
      lastName,
      password,
      schoolName,
      dob,
      employeeId,
    } = body;

    if (!mobile || !firstName || !password || !schoolName) {
      throw new BadRequestException('Required fields missing');
    }

    const existingAdmin = await this.adminModel.findOne({ mobile });
    if (existingAdmin) {
      throw new BadRequestException('Admin already exists');
    }
    let school = await this.schoolModel.findOne({
      name: new RegExp(`^${schoolName}$`, 'i'),
    });

    if (!school) {
      school = await this.schoolModel.create({ name: schoolName });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await this.adminModel.create({
      mobile,
      firstName,
      lastName,
      password: hashedPassword,
      schoolId: school._id,
      dob,
      employeeId,
    });

    return {
      success: true,
      message: 'Admin created successfully',
      data: admin,
    };
  }

  async login(body: any) {
    const { mobile, password } = body;

    if (!mobile || !password) {
      throw new BadRequestException('Mobile & Password required');
    }

    const admin = await this.adminModel
      .findOne({ mobile })
      .select('+password')
      .populate('schoolId', 'name');

    if (!admin) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      id: admin._id,
      role: 'SCHOOL_ADMIN',
      schoolId: admin.schoolId,
    };

    const token = await this.jwtService.signAsync(payload);
    admin.password = '';

    return {
      success: true,
      message: 'Login successful',
      token,
      data: admin,
    };
  }

  async getAdmins() {
    return this.adminModel
      .find()
      .populate('schoolId', 'name')
      .sort({ createdAt: -1 });
  }
}
