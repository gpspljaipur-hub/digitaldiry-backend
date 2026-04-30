import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './schema/school.schema';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
  ],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
