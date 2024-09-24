import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { mailerConfig } from './mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [MailerModule.forRoot(mailerConfig)],
  exports: [MailerModule, EmailService],
})
export class EmailModule {}
