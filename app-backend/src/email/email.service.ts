import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(targetEmail: string, content: string) {
    try {
      await this.mailerService.sendMail({
        to: targetEmail,
        subject: 'Hello World Test',
        html: content,
      });
    } catch (error) {
      console.log('Error Send Email', error);
      return false;
    }
  }
}
