import { Injectable } from '@nestjs/common';
import { Guild, GuildDocument } from './entities/guild.entity';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(Guild.name)
    private guildModel: Model<GuildDocument>,
  ) {}

  async findAll(): Promise<Guild[]> {
    return this.guildModel.find().exec();
  }
  
  async getAllMembersInGuild(id: ObjectId): Promise<any> {
    return this.guildModel.findById({ _id: id }).select('memberIdList').populate('memberIdList').exec();
  }

  async findGuildByMemberId(memberId: ObjectId): Promise<Guild[]> {
    return this.guildModel.find({ memberIdList: { $in: [memberId] } }).exec();
  }

  async getRoleByMemberId(id: ObjectId, memberId: ObjectId): Promise<string> {
    const guild = await this.guildModel.findById({ _id: id });
    const memberIdString = memberId.toString();

    const viceLeaderId = guild.viceLeaderIdList.filter(elementId => (elementId.toString() === memberIdString));

    if (memberIdString === guild.leaderId.toString()) {
      return 'leader';
    } else if (viceLeaderId.length > 0) {
      return 'vice-leader';
    } else {
      return 'member';
    }
  }

  async create(createGuildDto: CreateGuildDto) {
    const createdGuild = new this.guildModel(createGuildDto);
    return createdGuild.save();
  }

  async update(id: ObjectId, updateGuildDto: UpdateGuildDto): Promise<Guild> {
    return this.guildModel.findByIdAndUpdate(id, updateGuildDto, { new: true }).exec(); 
  }

  async updateLeader(id: ObjectId, leaderId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    const oldLeaderId = guild.leaderId;

    // update member status of ex-leader
    const memberIdList = (await this.removeMember(id, oldLeaderId)).memberIdList;
    guild.memberIdList = memberIdList;
    
    // update vice leader status of new leader, if vice leader is promoted
    const viceLeaderIdList = (await this.removeViceLeader(id, leaderId)).viceLeaderIdList;
    guild.viceLeaderIdList = viceLeaderIdList;
    
    guild.leaderId = leaderId;

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async addViceLeader(id: ObjectId, viceLeaderId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    guild.viceLeaderIdList.push(viceLeaderId);

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();    
  }

  async removeViceLeader(id: ObjectId, viceLeaderId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    guild.viceLeaderIdList = guild.viceLeaderIdList.filter(elementId => (elementId.toString() !== viceLeaderId.toString()));

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async addMember(id: ObjectId, memberId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    guild.memberIdList.push(memberId);

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async removeMember(id: ObjectId, memberId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    guild.memberIdList = guild.memberIdList.filter(elementId => (elementId.toString() !== memberId.toString()));
    guild.viceLeaderIdList = guild.viceLeaderIdList.filter(elementId => (elementId.toString() !== memberId.toString()))

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async remove(id: ObjectId): Promise<Guild> {
    return this.guildModel.findByIdAndDelete(id).exec();
  }

  // debugging service
  // async findOne(id: ObjectId): Promise<Guild> {
  //   return this.guildModel.findById({ _id: id }).exec();
  // }
}
