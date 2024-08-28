import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateChatLitDto {
  @ApiProperty()
  @IsNotEmpty()
  ownerId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  userId: ObjectId;
}
