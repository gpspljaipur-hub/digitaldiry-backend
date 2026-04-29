import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Marks, MarksSchema } from './schema/marks.schema';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Marks.name, schema: MarksSchema }]),
  ],
  providers: [MarksService],
  controllers: [MarksController],
})
export class MarksModule {}
