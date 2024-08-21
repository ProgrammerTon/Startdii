import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createUserDto: CreateTagDto): Promise<Tag> {
    const data = await this.findOne(createUserDto.name)
    if (!data){
      const tag = plainToInstance(Tag, createUserDto);
      return this.tagRepository.save(tag);
    }
    return data
  }

  findAll() {
    return `This action returns all tags`;
  }

  async findOne(name: string): Promise<Tag> {
    return this.tagRepository.findOne({ where: { name } });
  }
  
  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
