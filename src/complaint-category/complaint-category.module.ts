import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ComplaintCategory,
  ComplaintCategorySchema,
} from './schema/complaint-category.schema';
import { ComplaintCategoryService } from './complaint-category.service';
import { ComplaintCategoryController } from './complaint-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComplaintCategory.name, schema: ComplaintCategorySchema },
    ]),
  ],
  providers: [ComplaintCategoryService],
  controllers: [ComplaintCategoryController],
})
export class ComplaintCategoryModule {}
