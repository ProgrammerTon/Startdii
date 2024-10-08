import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source, SourceDocument } from './entities/source.entity';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Chat, ChatDocument } from 'src/chat/entities/chat.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = plainToInstance(Source, createSourceDto);
    const owner = await this.userModel.findById(source.ownerId).exec();
    source.ownerId = new ObjectId(source.ownerId);
    const createdSource = new this.sourceModel(source);
    await createdSource.save();
    this.addSourceFromTags(createdSource._id as ObjectId);
    owner.sources.push(createdSource._id as ObjectId);
    await owner.save();
    return createdSource;
  }

  // --------------------------- Get ---------------------------

  async getRating(id: ObjectId) {
    const obj = await this.sourceModel.findById(id).exec();
    const rating = obj.rating;
    const totalScore = rating.reduce((sum, r) => sum + r.score, 0);
    const averageScore = rating.length ? totalScore / rating.length : 0;
    return { Rating: averageScore, Count: rating.length };
  }

  /*async findByTag(tagname: string): Promise<Source[]> {
    const sources = new Array<Source>();
    const tag = await this.tagModel.findOne({ name: tagname }).exec();
    if (tag) {
      for (let i = 0; i < tag.sources.length; i++) {
        sources.push(await this.sourceModel.findById(tag.sources[i]).exec());
      }
    }
    return sources;
  }*/

  // --------------------------- Update ---------------------------

  async update(
    id: ObjectId,
    updateSourceDto: UpdateSourceDto,
  ): Promise<Source> {
    this.removeSourceFromTags(id);

    const updatedSource = await this.sourceModel
      .findByIdAndUpdate(
        id,
        { $set: updateSourceDto },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();

    this.addSourceFromTags(updatedSource.id);
    // Return the updated document, or null if not found
    return updatedSource;
  }

  async updateRatingScores() {
    let objs = await this.sourceModel.find().exec();
    let rating;
    for (let i = 0; i < objs.length; i++) {
      rating = await this.getRating(objs[i]._id as ObjectId);
      objs[i].avg_rating_score = rating.Rating;
      objs[i].rating_count = rating.Count;
      objs[i].save();
    }
    return objs;
  }

  async userRating(id: ObjectId, score: number, raterId: ObjectId) {
    const obj = await this.sourceModel.findById(id).exec();
    obj.rating = obj.rating.filter(
      (r) => r.raterId.toString() !== raterId.toString(),
    );
    obj.rating.push({ raterId: raterId, score: score });
    await obj.save();
    let rating_score = await this.getRating(id);
    obj.avg_rating_score = rating_score.Rating;
    obj.rating_count = rating_score.Count;
    return await obj.save();
  }

  async dataReset(id: ObjectId) {
    const obj = await this.sourceModel.findById(id).exec();
    obj.rating = [];
    await this.sourceModel
      .findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();
    await obj.save();
    return obj;
  }

  // --------------------------- Delete ---------------------------

  async delete(id: ObjectId): Promise<void> {
    await this.removeSourceFromTags(id);
    await this.removeSourceFromUsers(id);
    await this.deleteChatWithSourceId(id);
    await this.sourceModel.findByIdAndDelete(id).exec();
  }

  async addSourceFromTags(id: ObjectId) {
    const source = await this.sourceModel.findById(id).exec();
    let tag;
    if (source?.tags?.length) {
      for (let i = 0; i < source.tags.length; i++) {
        tag = await this.tagModel.findOne({ name: source.tags[i] }).exec();
        if (!tag) {
          tag = await this.tagModel.create({ name: source.tags[i] });
        }
        tag.sources.push(id);
        tag.save();
      }
    }
  }

  async removeSourceFromTags(id: ObjectId) {
    // Find the document by ID and apply the updates
    const source = await this.sourceModel.findById(id).exec();
    let tag;
    if (source?.tags?.length) {
      for (let i = 0; i < source.tags.length; i++) {
        tag = await this.tagModel.findOne({ name: source.tags[i] }).exec();
        if (!tag) {
          tag = await this.tagModel.create({ name: source.tags[i] });
        }
        tag.sources = tag.sources.filter(
          (element) => String(element) !== String(id),
        );
        tag.save();
      }
    }
  }

  async removeSourceFromUsers(id: ObjectId) {
    id = new Types.ObjectId(id);
    await this.userModel
      .updateMany({ favorite_sources: id }, { $pull: { favorite_sources: id } })
      .exec();
    await this.userModel
      .updateMany({ sources: id }, { $pull: { sources: id } })
      .exec();
  }

  async deleteChatWithSourceId(id: ObjectId) {
    id = new Types.ObjectId(id);
    await this.chatModel.deleteMany({ sourceId: id }).exec();
  }

  async findById(id: ObjectId): Promise<Source | null> {
    const source = await this.sourceModel
      .findById(id)
      .populate('ownerId', 'username')
      .exec();
    const rating = source.rating || []; // Ensure 'rating' exists
    const totalScore = rating.reduce((sum, r) => sum + r.score, 0); // Calculate total score
    const averageScore = rating.length ? totalScore / rating.length : 0; // Calculate average score
    const sourceObj = source.toObject();
    delete sourceObj.rating;
    const transformedSources = {
      ...sourceObj,
      count: rating.length,
      averageScore,
    };
    return transformedSources;
  }

  async findAll() {
    return this.sourceModel.find().exec();
  }

  async findByOffset(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    sortField: 'createdAt' | 'avg_rating_score',
  ): Promise<Source[] | null> {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const sources = await this.sourceModel
      .find()
      .select(
        '-updatedAt -description -content -filename -originalname -rating -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
    return sources;
  }

  async findByOffsetWithTitle(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    title: string,
    sortField: 'createdAt' | 'avg_rating_score',
  ): Promise<Source[] | null> {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const sources = await this.sourceModel
      .find({ $text: { $search: title } })
      .select(
        '-updatedAt -description -content -filename -originalname -rating -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
    const transformedSources = sources.map((source) => {
      const rating = source.rating || []; // Ensure 'rating' exists
      const totalScore = rating.reduce((sum, r) => sum + r.score, 0); // Calculate total score
      const averageScore = rating.length ? totalScore / rating.length : 0; // Calculate average score
      const sourceObj = source.toObject();
      delete sourceObj.rating;
      return {
        ...sourceObj, // Convert Mongoose document to plain object
        averageScore, // Add averageScore
      };
    });
    return transformedSources;
  }

  async searchByTitle(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    keyword: string,
    sortField: 'createdAt' | 'avg_rating_score',
  ): Promise<Source[]> {
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const size = 10;
    const skip = (offset - 1) * size;
    return this.sourceModel
      .find({ $text: { $search: keyword } })
      .select(
        '-updatedAt -description -content -filename -originalname -rating -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
  }

  async findSourcesByTags(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    tags: string[],
    sortField: 'createdAt' | 'avg_rating_score',
  ) {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    return this.sourceModel
      .find({
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .select(
        '-updatedAt -description -content -filename -originalname -rating -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
  }

  async findSourcesByTagsAndTitle(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    tags: string[],
    title: string,
    sortField: 'createdAt' | 'avg_rating_score',
  ) {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    return this.sourceModel
      .find({
        $text: { $search: title },
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .select(
        '-updatedAt -description -content -filename -originalname -rating -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
  }

  /*async findByTag(tagname: string): Promise<Source[]> {
    const sources = new Array<Source>();
    const tag = await this.tagModel.findOne({ name: tagname }).exec();
    if (tag) {
      for (let i = 0; i < tag.sources.length; i++) {
        sources.push(await this.sourceModel.findById(tag.sources[i]).exec());
      }
    }
    return sources;
  }*/
}
