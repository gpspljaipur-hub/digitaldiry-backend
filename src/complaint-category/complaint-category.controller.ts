import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComplaintCategoryService } from './complaint-category.service';

@Controller('complaint-category')
export class ComplaintCategoryController {
  constructor(private categoryService: ComplaintCategoryService) {}

  @Post('add')
  add(@Body('name') name: string) {
    return this.categoryService.addCategory(name);
  }

  @Get('list')
  get() {
    return this.categoryService.getCategories();
  }
}
