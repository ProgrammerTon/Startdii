import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { GuildsService } from './guilds.service';
import { Types } from 'mongoose';

import { ParseObjectIdPipe } from 'src/common/pipes';
import genInviteCode from './utils/guilds.genInviteCode';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Guild')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post(':leaderId')
  create(
    @Param('leaderId', ParseObjectIdPipe) leaderId: ObjectId,
    @Body() createGuildDto: CreateGuildDto,
  ) {
    createGuildDto.inviteCode = genInviteCode();
    createGuildDto.leaderId = leaderId;
    createGuildDto.viceLeaderIdList = [];
    createGuildDto.memberIdList = [leaderId];

    return this.guildsService.create(createGuildDto);
  }

  @Get()
  findAll() {
    return this.guildsService.findAll();
  }

  // @Get('test/:id')
  // findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
  //   return this.guildsService.findOne(id);
  // }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('joinGuild/:inviteCode')
  addMemberByCode(@Param('inviteCode') inviteCode: string, @Request() req) {
    const userId = new Types.ObjectId(req.user.id);
    const guild = this.guildsService.addMemberByCode(inviteCode, userId);
    if (!guild) {
      throw new HttpException('Not Found Guild', HttpStatus.NOT_FOUND);
    }
    return guild;
  }

  @Get(':id')
  getAllMembersInGuild(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.guildsService.findGuildById(id);
  }

  @Get(':id/:memberId')
  getRoleByMemberId(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Param('memberId', ParseObjectIdPipe) memberId: ObjectId,
  ) {
    return this.guildsService.getRoleByMemberId(id, memberId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateGuildDto: UpdateGuildDto,
  ) {
    return this.guildsService.update(id, updateGuildDto);
  }

  @Patch(':id/leader/:leaderId')
  updateLeader(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Param('leaderId', ParseObjectIdPipe) leaderId: ObjectId,
  ) {
    return this.guildsService.updateLeader(id, leaderId);
  }

  @Patch(':id/vice-leader/:viceLeaderId')
  updateMember(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Param('viceLeaderId', ParseObjectIdPipe) viceLeaderId: ObjectId,
    @Query() query: { option: string },
  ) {
    const option = query.option;
    if (option === 'add') {
      return this.guildsService.addViceLeader(id, viceLeaderId);
    } else if (option === 'remove') {
      return this.guildsService.removeViceLeader(id, viceLeaderId);
    }
  }

  @Patch(':id/member/:memberId')
  updateViceLeader(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Param('memberId', ParseObjectIdPipe) memberId: ObjectId,
    @Query() query: { option: string },
  ) {
    const option = query.option;
    if (option === 'add') {
      return this.guildsService.addMember(id, memberId);
    } else if (option === 'remove') {
      return this.guildsService.removeMember(id, memberId);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.guildsService.remove(id);
  }
}
