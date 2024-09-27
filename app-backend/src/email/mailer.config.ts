import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const mailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    service: configService.get<string>('MAILER_TRANSPORT_SERVICE'),
    auth: {
      user: configService.get<string>('MAILER_AUTH_USER'),
      pass: configService.get<string>('MAILER_AUTH_PASS'),
    },
  },
});
