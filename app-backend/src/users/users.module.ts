import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from 'src/sources/entities/source.entity';
import { ChatList, ChatListSchema } from './entities/chatlist.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Source.name, schema: SourceSchema },
      { name: ChatList.name, schema: ChatListSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
