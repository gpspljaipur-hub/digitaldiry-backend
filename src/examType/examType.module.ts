import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamTypeService } from './examType.service';
import { ExamTypeController } from './examType.controller';
import { ExamType, ExamTypeSchema } from './schema/examType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamType.name, schema: ExamTypeSchema },
    ]),
  ],
  providers: [ExamTypeService],
  controllers: [ExamTypeController],
})
export class ExamTypeModule {}
