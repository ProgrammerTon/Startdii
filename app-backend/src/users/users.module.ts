import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
