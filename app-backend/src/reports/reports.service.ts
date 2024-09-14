import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectId } from 'mongodb';

import { Report, ReportDocument } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  async findAll(): Promise<Report[]> {
    return this.reportModel.find().exec();
  }

  async findAllByReferenceId(
    referenceId: ObjectId,
    option: string,
  ): Promise<any> {
    const query = {};
    if (option === 'user') {
      query['userId'] = referenceId;
    } else if (option === 'source') {
      query['sourceId'] = referenceId;
    } else if (option === 'quiz') {
      query['quizId'] = referenceId;
    }

    const reports = await this.reportModel
      .find(query)
      .populate({
        path: 'reporterId',
        select: 'username',
      })
      .exec();

    const allReports = reports.map((report) => ({
      _id: report['_id'],
      username: report.reporterId['username'],
      reason: report.reason,
      description: report.description,
    }));

    return allReports;
  }

  async create(createReportDto: CreateReportDto) {
    const createdReport = new this.reportModel(createReportDto);
    return createdReport.save();
  }

  async remove(id: ObjectId) {
    return this.reportModel.findByIdAndDelete({ _id: id });
  }
}
