import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { ChatListService } from './chatlist.service';
import { Types } from 'mongoose';
import { CreateChatDto } from './dto/create-chatlist.dto';
import { GuildsService } from 'src/guilds/guilds.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatListService: ChatListService,
    private readonly guildsService: GuildsService,
  ) {}

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('chatlist')
  addChatList(@Body() createChatListDto: CreateChatDto) {
    return this.chatListService.create(createChatListDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile/:userId')
  getOtherProfile(@Param('userId', ParseObjectIdPipe) userId: ObjectId) {
    return this.usersService.getOtherProfile(userId);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.usersService.findByEmail(req.user.email);
    return user;
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/answerQuiz/:quizId')
  getAnswers(@Param('quizId') quizId: string, @Request() req) {
    const user = this.usersService.getAnswer(req.user.id, quizId);
    return user;
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/quiz_history')
  getQuizHistory(@Request() req) {
    const quizs = this.usersService.getQuizHistory(req.user.id);
    return quizs;
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('guild')
  findGuildByMemberId(@Request() req, @Query() query: { title: string }) {
    const memberId = new Types.ObjectId(req.user.id);
    if (!query.title) {
      return this.guildsService.findGuildByMemberId(memberId);
    } else {
      return this.guildsService.findGuildByMemberIdAndName(
        memberId,
        query.title,
      );
    }
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('chatlist')
  getChatList(@Request() req) {
    const ownerId = new Types.ObjectId(req.user.id);
    return this.chatListService.findAllChatList(ownerId);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('chatlist/:chatId')
  findChatList(
    @Request() req,
    @Param('chatId', ParseObjectIdPipe) chatId: ObjectId,
  ) {
    const ownerId = new Types.ObjectId(req.user.id);
    return this.chatListService.findChatList(chatId, ownerId);
  }

  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    const data = await this.usersService.findByUsername(username);
    if (data == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Get(':ownerId/sources')
  getSources(
    @Param('ownerId', ParseObjectIdPipe) id: ObjectId,
    @Query()
    query: {
      title: string | null;
    },
  ) {
    if (!query.title) {
      query.title = '';
    }
    return this.usersService.getSources(id, query.title);
  }

  @Get(':ownerId/quizs')
  getQuizzes(
    @Param('ownerId', ParseObjectIdPipe) id: ObjectId,
    @Query()
    query: {
      title: string | null;
    },
  ) {
    if (!query.title) {
      query.title = '';
    }
    return this.usersService.getQuizzes(id, query.title);
  }

  @Patch('favorite_sources/add/:userId/:sourceId')
  addFavoriteSource(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId,
  ) {
    return this.usersService.addFavoriteSource(userId, sourceId);
  }

  @Patch('favorite_sources/remove/:userId/:sourceId')
  removeFavoriteSource(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId,
  ) {
    return this.usersService.removeFavoriteSource(userId, sourceId);
  }

  @Patch('favorite_quizzes/add/:userId/:quizId')
  addFavoriteQuiz(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('quizId', ParseObjectIdPipe) quizId: ObjectId,
  ) {
    return this.usersService.addFavoriteQuiz(userId, quizId);
  }

  @Patch('favorite_quizzes/remove/:userId/:quizId')
  removeFavoriteQuiz(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('quizId', ParseObjectIdPipe) quizId: ObjectId,
  ) {
    return this.usersService.removeFavoriteQuiz(userId, quizId);
  }

  @Get('favorite_sources/:userId')
  getFavoriteSource(@Param('userId', ParseObjectIdPipe) userId: ObjectId) {
    return this.usersService.getFavoriteSources(userId);
  }

  @Get('favorite_quizzes/:userId')
  getFavoriteQuiz(@Param('userId', ParseObjectIdPipe) userId: ObjectId) {
    return this.usersService.getFavoriteQuizzes(userId);
  }

  @Get(':userId/rating/source/:sourceId')
  getSourceRating(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId,
  ) {
    return this.usersService.getSourceRating(userId, sourceId);
  }

  @Get(':userId/rating/quiz/:quizId')
  getQuizRating(
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
    @Param('quizId', ParseObjectIdPipe) quizId: ObjectId,
  ) {
    return this.usersService.getQuizRating(userId, quizId);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseObjectIdPipe) id: ObjectId,
  //   @Body() updateCourseDto: UpdateCourseDto,
  // ) {
  //   return this.coursesService.update(id, updateCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
  //   return this.coursesService.remove(id);
  // }
}
