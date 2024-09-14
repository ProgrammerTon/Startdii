import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from 'src/sources/entities/source.entity';
import { ChatList, ChatListSchema } from './entities/chatlist.entity';
import { ChatListService } from './chatlist.service';
import { GuildsModule } from 'src/guilds/guilds.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Source.name, schema: SourceSchema },
      { name: ChatList.name, schema: ChatListSchema },
    ]),
    GuildsModule,
  ],
  providers: [UsersService, ChatListService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
