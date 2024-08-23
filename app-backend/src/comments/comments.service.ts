import { Injectable } from '@nestjs/common';
import { Comment, CommentDocument } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findBySourceId(sourceId: ObjectId): Promise<Comment[]> {
    return this.commentModel.find({sourceId: sourceId}).exec();
  }

  async create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async remove(id: ObjectId) {
    return this.commentModel.findByIdAndDelete(id);
  }
}
