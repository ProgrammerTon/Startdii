import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
  transport: {
    service: 'Gmail',
    auth: {
      user: 'popole159za@gmail.com',
      pass: 'sfwj zwap njey vhku',
    },
  },
};
