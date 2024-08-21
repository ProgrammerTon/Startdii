import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { DataSource } from 'typeorm';
import { Course } from './courses/entities/course.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://best:best@cluster0.i9ydoci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      database: 'test03',
      entities: [Course, User],
    }),
    CoursesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
