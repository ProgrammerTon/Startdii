import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  public transform(value: any): ObjectId {
    try {
      const transformedObjectId: ObjectId = new Types.ObjectId(
        ObjectId.createFromHexString(value),
      );
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException('validation Failed need ObjectId');
    }
  }
}
