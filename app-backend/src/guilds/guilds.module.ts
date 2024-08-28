import { Module } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildsController } from './guilds.controller';
import { Guild, GuildSchema } from './entities/guild.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
