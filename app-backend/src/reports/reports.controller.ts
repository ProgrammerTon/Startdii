import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Delete, Param, Body, Request, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

import { ParseObjectIdPipe } from 'src/common/pipes';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':referenceId')
  findAllByReferenceId(@Param('referenceId', ParseObjectIdPipe) referenceId: ObjectId,
                       @Query('option') option: string) {
    return this.reportsService.findAllByReferenceId(referenceId, option);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':referenceId')
  create(@Param('referenceId', ParseObjectIdPipe) referenceId: ObjectId,
         @Body() createReportDto: CreateReportDto,
         @Request() req,
         @Query('option') option: string ) {
    
    createReportDto.reporterId = new Types.ObjectId(req.user.id);
  
    if (option === 'user') {
      createReportDto.userId = referenceId;
    } else if (option === 'source') {
      createReportDto.sourceId = referenceId;
    } else if (option === 'quiz') {
      createReportDto.quizId = referenceId;
    }

    return this.reportsService.create(createReportDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.reportsService.remove(id);
  }
}
