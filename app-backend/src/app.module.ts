import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsModule } from './tags/tags.module';
import { SourcesModule } from './sources/sources.module';
import { ChatGateway } from './chat/chat.gateway';
import { CommentsModule } from './comments/comments.module';
<<<<<<< HEAD
import { FilesController } from './files/files.controller';
=======
import { GuildsModule } from './guilds/guilds.module';
>>>>>>> d165c004650a1fdcef03a163635d357a45f98721

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    CoursesModule,
    AuthModule,
    UsersModule,
    TagsModule,
    SourcesModule,
    CommentsModule,
    GuildsModule
  ],
  controllers: [AppController, FilesController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
