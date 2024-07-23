import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
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
