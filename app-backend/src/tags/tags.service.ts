import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './entities/tag.entity';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Source, SourceDocument } from 'src/sources/entities/source.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = plainToInstance(Tag, createTagDto);
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  findAll() {
    return this.tagModel.find().exec();
  }

  async findOne(name: string): Promise<Tag> {
    return await this.tagModel.findOne({ name: name });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  async getSources(name: string) {
    return await this.tagModel.findOne({ name: name }).select('sources').populate('sources').exec();
  }

  // Remove all invalid sourceId(s)
  async patchSources(name: string) {
    let tag = await this.tagModel.findOne({ name: name });
    let sources = tag.sources.slice();
    
    for (var i = 0; i < sources.length; i++) {
      const source = await this.sourceModel.findById(sources[i]).exec();
      console.log(source);
      if (!source) {
        tag.sources = await tag.sources.filter(element => String(element) !== String(sources[i]))
      }
    }
    return tag.save()
  }
}
