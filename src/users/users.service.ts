import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  normalizePhone(phone: string): string {
    return phone.toString().replace(/\D/g, '').slice(-10);
  }

  generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendOtp(phone: string) {
    if (!phone) {
      throw new BadRequestException('Phone number required');
    }

    const normalizedPhone = this.normalizePhone(phone);

    console.log('Normalized Phone:', normalizedPhone);

    const user = await this.userModel.findOne({
      phone: normalizedPhone,
    });

    if (user) {
      throw new BadRequestException('Number already registered, please login');
    }

    const otp = this.generateOtp();

    return {
      success: true,
      message: 'OTP sent successfully',
      phone: normalizedPhone,
      otp,
    };
  }

  async verifyOtp(phone: string, otp: string) {
    if (!phone) {
      throw new BadRequestException('Phone number required');
    }

    if (!otp) {
      throw new BadRequestException('OTP required');
    }

    const normalizedPhone = this.normalizePhone(phone);

    console.log('Verify Phone:', normalizedPhone);

    let user = await this.userModel.findOne({
      phone: normalizedPhone,
    });

    if (!user) {
      user = await this.userModel.create({
        phone: normalizedPhone,
        isVerified: true,
      });
    }

    return {
      success: true,
      message: 'Login successful',
      user,
    };
  }
}
