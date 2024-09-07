import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Param,
  Patch,
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

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatListService: ChatListService,
    private readonly guildsService: GuildsService,
  ) {}

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

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.usersService.findByEmail(req.user.email);
    return user;
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('guild')
  findGuildByMemberId(@Request() req) {
    const memberId = new Types.ObjectId(req.user.id);
    return this.guildsService.findGuildByMemberId(memberId);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('chatlist')
  findChatList(@Request() req) {
    const ownerId = new Types.ObjectId(req.user.id);
    return this.chatListService.findAllChatList(ownerId);
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
  getSources(@Param('ownerId', ParseObjectIdPipe) id: ObjectId) {
    return this.usersService.getSources(id);
  }

  @Get(':ownerId/quizs')
  getQuizzes(@Param('ownerId', ParseObjectIdPipe) id: ObjectId) {
    return this.usersService.getQuizzes(id);
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
