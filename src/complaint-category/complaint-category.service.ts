import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ComplaintCategory,
  ComplaintCategoryDocument,
} from './schema/complaint-category.schema';
import { Model } from 'mongoose';

@Injectable()
export class ComplaintCategoryService {
  constructor(
    @InjectModel(ComplaintCategory.name)
    private categoryModel: Model<ComplaintCategoryDocument>,
  ) {}

  //  ADD CATEGORY
  async addCategory(name: string) {
    if (!name) {
      throw new BadRequestException('Category name required');
    }

    const exist = await this.categoryModel.findOne({ name });

    if (exist) {
      return {
        message: 'Category already exists',
        data: exist,
      };
    }

    return this.categoryModel.create({ name });
  }

  //  GET ALL
  async getCategories() {
    return this.categoryModel.find().sort({ createdAt: -1 });
  }
}
