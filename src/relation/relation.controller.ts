import { Controller, Post, Body, Get } from '@nestjs/common';
import { RelationService } from './relation.service';

@Controller('relation')
export class RelationController {
  constructor(private relationService: RelationService) {}

  @Post('add')
  add(@Body('name') name: string) {
    return this.relationService.addRelation(name);
  }

  @Get('list')
  get() {
    return this.relationService.getRelations();
  }
}
