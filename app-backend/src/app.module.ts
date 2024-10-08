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
import { QuizsModule } from './quizs/quizs.module';
import { FilesController } from './files/files.controller';
import { GuildsModule } from './guilds/guilds.module';
import { ChatModule } from './chat/chat.module';
import { ReportsModule } from './reports/reports.module';
import { LevelsModule } from './levels/levels.module';
import { GoalsModule } from './goals/goal.module';
import { ProgressionsModule } from './progressions/progressions.module';
import { EmailModule } from './email/email.module';

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
    QuizsModule,
    GuildsModule,
    ChatModule,
    ReportsModule,
    LevelsModule,
    GoalsModule,
    ProgressionsModule,
    EmailModule,
  ],
  controllers: [AppController, FilesController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
