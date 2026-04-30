import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Relation, RelationSchema } from './schema/relation.schema';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relation.name, schema: RelationSchema },
    ]),
  ],
  providers: [RelationService],
  controllers: [RelationController],
})
export class RelationModule {}
