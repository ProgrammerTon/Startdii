import { Controller, Post, Body, Get, Request , Param, Patch} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('sources/:ownerId')
  findSourcesByUserId(@Param('ownerId') id: ObjectId) {
    return this.usersService.findSourcesByUserId(id);
  }

  @Patch('favorite_sources/add/:userId/:sourceId')
  addFavoriteSource(@Param('userId') userId: ObjectId, @Param('sourceId') sourceId: ObjectId){
    return this.usersService.addFavoriteSource(userId,sourceId);
  }

  @Patch('favorite_sources/remove/:userId/:sourceId')
  removeFavoriteSource(@Param('userId') userId: ObjectId, @Param('sourceId') sourceId: ObjectId){
    return this.usersService.removeFavoriteSource(userId,sourceId);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.usersService.findByEmail(req.user.email);
    return user;
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
