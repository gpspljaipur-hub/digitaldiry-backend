import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from './schema/register.schema';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [RegisterService],
  controllers: [RegisterController],
})
export class RegisterModule {}
