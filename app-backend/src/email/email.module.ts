import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { mailerConfig } from './mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => mailerConfig(configService),
    }),
  ],
  exports: [MailerModule, EmailService],
})
export class EmailModule {}
