import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Guild, GuildDocument } from './entities/guild.entity';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(Guild.name)
    private guildModel: Model<GuildDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createGuildDto: CreateGuildDto) {
    const createdGuild = new this.guildModel(createGuildDto);
    return createdGuild.save();
  }

  // --------------------------- Get ---------------------------

  async findAll(): Promise<Guild[]> {
    return this.guildModel.find().exec();
  }

  // debugging service
  // async findOne(id: ObjectId): Promise<Guild> {
  //   return this.guildModel.findById({ _id: id }).exec();
  // }

  async getAllMembersInGuild(id: ObjectId): Promise<any> {
    return this.guildModel
      .findById({ _id: id })
      .select('memberIdList')
      .populate('memberIdList')
      .exec();
  }

  async findGuildByMemberId(memberId: ObjectId): Promise<Guild[]> {
    return this.guildModel.find({ memberIdList: { $in: [memberId] } }).exec();
  }

  async findGuildByMemberIdAndName(
    memberId: ObjectId,
    guildName: string,
  ): Promise<Guild[]> {
    return this.guildModel
      .find({
        memberIdList: { $in: [memberId] },
        $regex: new RegExp(guildName, 'i'),
      })
      .exec();
  }

  async findGuildById(id: ObjectId): Promise<any> {
    const data = await this.guildModel
      .findById({ _id: id })
      .populate('memberIdList')
      .exec();
    const transformedData = {
      _id: data._id,
      inviteCode: data.inviteCode,
      memberIdList: data.memberIdList.map((member: any) => {
        const memberIdString = member._id.toString();

        const viceLeaderId = data.viceLeaderIdList.filter(
          (elementId) => elementId.toString() === memberIdString,
        );
        let role;
        if (memberIdString === data.leaderId.toString()) {
          role = 'leader';
        } else if (viceLeaderId.length > 0) {
          role = 'vice-leader';
        } else {
          role = 'member';
        }
        return {
          _id: member._id,
          email: member.email,
          username: member.username,
          firstname: member.firstname,
          lastname: member.lastname,
          role: role,
        };
      }),
      leaderId: data.leaderId,
      viceLeaderIdList: data.viceLeaderIdList,
      name: data.name,
      description: data.description,
      cover: data.cover,
    };
    return transformedData;
  }

  async getRoleByMemberId(id: ObjectId, memberId: ObjectId): Promise<string> {
    const guild = await this.guildModel.findById({ _id: id });
    const memberIdString = memberId.toString();

    const viceLeaderId = guild.viceLeaderIdList.filter(
      (elementId) => elementId.toString() === memberIdString,
    );

    if (memberIdString === guild.leaderId.toString()) {
      return 'leader';
    } else if (viceLeaderId.length > 0) {
      return 'vice-leader';
    } else {
      return 'member';
    }
  }

  // --------------------------- Update ---------------------------

  async update(id: ObjectId, updateGuildDto: UpdateGuildDto): Promise<Guild> {
    return this.guildModel
      .findByIdAndUpdate(id, updateGuildDto, { new: true })
      .exec();
  }

  async updateLeader(id: ObjectId, leaderId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });

    // if leader is the only member of guild
    if (guild.memberIdList.length <= 1) {
      return this.remove(id);
    }

    const oldLeaderId = guild.leaderId;

    // update member status of ex-leader
    const memberIdList = (await this.removeMember(id, oldLeaderId))
      .memberIdList;
    guild.memberIdList = memberIdList;

    // update vice leader status of new leader, if vice leader is promoted
    const viceLeaderIdList = (await this.removeViceLeader(id, leaderId))
      .viceLeaderIdList;
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
    guild.viceLeaderIdList = guild.viceLeaderIdList.filter(
      (elementId) => elementId.toString() !== viceLeaderId.toString(),
    );

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async addMember(id: ObjectId, memberId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    if (!guild) {
      return null;
    }

    const member = guild.memberIdList.filter(
      (elementId) => elementId.toString() === memberId.toString(),
    );
    if (member.length > 0) {
      throw new HttpException(
        'User is already in the guild',
        HttpStatus.BAD_REQUEST,
      );
    }

    guild.memberIdList.push(memberId);

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  async removeMember(id: ObjectId, memberId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findById({ _id: id });
    guild.memberIdList = guild.memberIdList.filter(
      (elementId) => elementId.toString() !== memberId.toString(),
    );
    guild.viceLeaderIdList = guild.viceLeaderIdList.filter(
      (elementId) => elementId.toString() !== memberId.toString(),
    );

    return this.guildModel.findByIdAndUpdate(id, guild, { new: true }).exec();
  }

  // --------------------------- Delete ---------------------------

  async remove(id: ObjectId): Promise<Guild> {
    return this.guildModel.findByIdAndDelete(id).exec();
  }

  async addMemberByCode(inviteCode: string, userId: ObjectId): Promise<Guild> {
    const guild = await this.guildModel.findOne({ inviteCode });
    if (!guild) {
      return null;
    }

    const member = guild.memberIdList.filter(
      (elementId) => elementId.toString() === userId.toString(),
    );
    if (member.length > 0) {
      throw new HttpException(
        'User is already in the guild',
        HttpStatus.BAD_REQUEST,
      );
    }

    guild.memberIdList.push(userId);

    return this.guildModel
      .findByIdAndUpdate(guild._id, guild, { new: true })
      .exec();
  }

  // debugging service
  // async findOne(id: ObjectId): Promise<Guild> {
  //   return this.guildModel.findById({ _id: id }).exec();
  // }
}
