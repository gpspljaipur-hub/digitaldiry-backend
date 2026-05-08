import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolAdmin, SchoolAdminSchema } from './schema/school-admin.schema';
import { SchoolAdminService } from './school-admin.service';
import { SchoolAdminController } from './school-admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { School, SchoolSchema } from '../school/schema/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolAdmin.name, schema: SchoolAdminSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SchoolAdminController],
  providers: [SchoolAdminService],
})
export class SchoolAdminModule {}
