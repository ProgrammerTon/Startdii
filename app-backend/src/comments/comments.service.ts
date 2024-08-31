import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Comment, CommentDocument, ReplyComment, ReplyCommentDocument } from './entities/comment.entity';
import { CreateCommentDto, CreateReplyCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
    @InjectModel(ReplyComment.name)
    private replyCommentModel: Model<ReplyCommentDocument>
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }
  
  async findAllBySourceId(sourceId: ObjectId): Promise<any> {
    const comments = await this.commentModel.find({ sourceId: sourceId })
    .populate({
      path: 'ownerId',
      select: 'username'
    })
    .populate({
      path: 'replyComments.ownerId',
      select: 'username'
    })
    .exec();

    const allUsernames = comments.map(comment => ({
      parentComment: {
        id: comment.ownerId['username'],
        content: comment.content
      },
      replyComments: comment.replyComments.map(reply => ({
        id: reply.ownerId['username'],
        content: reply.content
      }))
    }));

    return allUsernames;
  }

  async create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async createReplyComment(id: ObjectId, createReplyCommentDto: CreateReplyCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findById({ _id: id });
    const replyComment = new this.replyCommentModel(createReplyCommentDto);

    comment.replyComments.push(replyComment);
    replyComment.save();

    return this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
  }

  async removeReplyComment(id: ObjectId, replyCommentId: string): Promise<Comment> {
    const comment = await this.commentModel.findById({ _id: id });
    comment.replyComments = comment.replyComments.filter(reply => reply['_id'].toString() !== replyCommentId);

    return this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
  }

  async remove(id: ObjectId) {
    return this.commentModel.findByIdAndDelete(id);
  }
}
