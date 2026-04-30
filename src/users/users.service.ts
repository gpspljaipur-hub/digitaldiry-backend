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

  //  Generate 4 digit OTP
  generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendOtp(phone: string) {
    if (!phone) {
      throw new BadRequestException('Phone number required');
    }

    const normalizedPhone = this.normalizePhone(phone);

    const user = await this.userModel.findOne({
      phone: normalizedPhone,
    });

    //  Case: already verified but not registered
    if (user && user.isVerified && !user.isRegistered) {
      return {
        success: true,
        message: 'Number already verified, please complete registration',
        data: {
          phone: normalizedPhone,
          isVerified: user.isVerified,
          isRegistered: user.isRegistered,
        },
      };
    }

    if (user && user.isVerified && user.isRegistered) {
      return {
        success: true,
        message: 'User already registered, please login',
        data: {
          phone: normalizedPhone,
          isVerified: user.isVerified,
          isRegistered: user.isRegistered,
        },
      };
    }

    const otp = this.generateOtp();

    if (user) {
      user.otp = otp;
      user.otpCreatedAt = new Date();
      await user.save();
    } else {
      await this.userModel.create({
        phone: normalizedPhone,
        otp,
        otpCreatedAt: new Date(),
        isVerified: false,
        isRegistered: false,
      });
    }

    return {
      success: true,
      message: 'OTP sent successfully',
      data: {
        phone: normalizedPhone,
        isVerified: false,
        isRegistered: false,
        otp,
      },
    };
  }

  async verifyOtp(phone: string, otp: string) {
    const normalizedPhone = this.normalizePhone(phone);

    const user = await this.userModel.findOne({
      phone: normalizedPhone,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    user.isVerified = true;
    await user.save();

    return {
      success: true,
      message: 'OTP verified successfully',
      data: {
        phone: user.phone,
        isVerified: user.isVerified,
        isRegistered: user.isRegistered,
      },
    };
  }

  async completeRegistration(phone: string, data: any) {
    const normalizedPhone = this.normalizePhone(phone);

    const user = await this.userModel.findOne({
      phone: normalizedPhone,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.isVerified) {
      throw new BadRequestException('Please verify OTP first');
    }

    if (user.isRegistered) {
      throw new BadRequestException('User already registered');
    }

    // ✅ Save extra data
    Object.assign(user, data);

    user.isRegistered = true;

    await user.save();

    return {
      success: true,
      message: 'Registration completed successfully',
      user,
    };
  }
}
