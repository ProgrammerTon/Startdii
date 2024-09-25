import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  testSendEmail() {
    return this.emailService.sendEmail(
      'popole159za@gmail.com',
      'Hello From startdii',
    );
    // return this.emailService.sendEmail(targetMail, content);
  }
}
