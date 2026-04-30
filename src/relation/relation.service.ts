import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relation, RelationDocument } from './schema/relation.schema';
import { Model } from 'mongoose';

@Injectable()
export class RelationService {
  constructor(
    @InjectModel(Relation.name)
    private relationModel: Model<RelationDocument>,
  ) {}

  async addRelation(name: string) {
    if (!name) {
      throw new BadRequestException('Relation name required');
    }

    const exist = await this.relationModel.findOne({ name });

    if (exist) {
      return { message: 'Relation already exists', data: exist };
    }

    return this.relationModel.create({ name });
  }

  async getRelations() {
    return this.relationModel.find().sort({ createdAt: -1 });
  }
}
