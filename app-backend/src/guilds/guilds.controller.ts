import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { GuildsService } from './guilds.service';

import { ParseObjectIdPipe } from 'src/common/pipes';
import genInviteCode from './utils/guilds.genInviteCode';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get()
  findAll() {
    return this.guildsService.findAll();
  }

  // @Get(':memberId')
  // findGuildByMemberId(@Param('memberId', ParseObjectIdPipe) memberId: ObjectId) {
  //   return this.guildsService.findGuildByMemberId(memberId);
  // }

  @Get(':id')
  getAllMembersInGuild(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.guildsService.getAllMembersInGuild(id);
  }

  @Get(':id/:memberId')
  getRoleByMemberId(@Param('id', ParseObjectIdPipe) id: ObjectId,
                    @Param('memberId', ParseObjectIdPipe) memberId: ObjectId) {
    return this.guildsService.getRoleByMemberId(id, memberId);
  }

  @Post(':leaderId')
  create(@Param('leaderId', ParseObjectIdPipe) leaderId: ObjectId,
         @Body() createGuildDto: CreateGuildDto) {
    createGuildDto.inviteCode = genInviteCode();
    createGuildDto.leaderId = leaderId;
    createGuildDto.viceLeaderIdList = []
    createGuildDto.memberIdList = [leaderId];

    return this.guildsService.create(createGuildDto);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: ObjectId,
         @Body() updateGuildDto: UpdateGuildDto) {
    return this.guildsService.update(id, updateGuildDto);
  }

  @Patch(':id/leader/:leaderId')
  updateLeader(@Param('id', ParseObjectIdPipe) id: ObjectId,
               @Param('leaderId', ParseObjectIdPipe) leaderId: ObjectId) {
    return this.guildsService.updateLeader(id, leaderId);
  }
  
  @Patch(':id/vice-leader/:viceLeaderId')
  updateMember(@Param('id', ParseObjectIdPipe) id: ObjectId,
               @Param('viceLeaderId', ParseObjectIdPipe) viceLeaderId: ObjectId,
               @Query() query: { option: string }) {

    const option = query.option;   
    if (option === 'add') {
      return this.guildsService.addViceLeader(id, viceLeaderId);
    } else if (option === 'remove') {
      return this.guildsService.removeViceLeader(id, viceLeaderId);
    }
  }

  @Patch(':id/member/:memberId')
  updateViceLeader(@Param('id', ParseObjectIdPipe) id: ObjectId,
                   @Param('memberId', ParseObjectIdPipe) memberId: ObjectId,
                   @Query() query: { option: string }) {

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

  // @Get('test/:id')
  // findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
  //   return this.guildsService.findOne(id);
  // }
}
