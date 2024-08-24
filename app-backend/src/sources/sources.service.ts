import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source , SourceDocument } from './entities/source.entity';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
  ) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = plainToInstance(Source, createSourceDto);
    source.ownerId = new ObjectId(source.ownerId)
    const createdSource = new this.sourceModel(source);
    return createdSource.save();
  }

  async delete(id: ObjectId): Promise<void> {
    await this.sourceModel.findByIdAndDelete({ id }).exec();
  }

  async update(id: ObjectId, updateSourceDto: UpdateSourceDto): Promise<Source> {
    // Find the document by ID and apply the updates
    const updatedSource = await this.sourceModel.findByIdAndUpdate(
      id,
      { $set: updateSourceDto },
      { new: true, useFindAndModify: false }, // Return the updated document
    ).exec();

    // Return the updated document, or null if not found
    return updatedSource;
  }

  async findById(id: ObjectId): Promise<Source | null> {
    return this.sourceModel.findById(id).exec();
  }

  
  
  async findAll() {
    return this.sourceModel.find().exec();
  }
}
