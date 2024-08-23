import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsModule } from './tags/tags.module';
import { SourcesModule } from './sources/sources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb+srv://best:best@cluster0.i9ydoci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    CoursesModule,
    AuthModule,
    UsersModule,
    TagsModule,
    SourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
