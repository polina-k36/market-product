// import {
//   Inject,
//   Injectable,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import { SendEmailDto } from './dto/send-email.dto.js';
// import mailConfig from '../common/config/mail.config.js';
// import type { ConfigType } from '@nestjs/config';

// @Injectable()
// export class MailService {
//   constructor(
//     @Inject(mailConfig.KEY)
//     private readonly config: ConfigType<typeof mailConfig>,
//   ) {}
//   private getEmailTransport() {
//     const transporter = nodemailer.createTransport({
//       host: this.config.host,
//       port: this.config.port,
//       secure: false,
//       auth: {
//         user: this.config.user,
//         pass: this.config.password,
//       },
//     });

//     return transporter;
//   }

//   async sendEmail(sendEmailDto: SendEmailDto) {
//     const { recipient, subject, html } = sendEmailDto;

//     const transport = this.getEmailTransport();

//     const options: nodemailer.SendMailOptions = {
//       from: this.config.user,
//       to: recipient,
//       subject,
//       html,
//     };

//     try {
//       await transport.sendMail(options);
//       return {
//         success: true,
//         message: 'Email sent successfully!',
//       };
//     } catch (error) {
//       console.log(error);
//       throw new InternalServerErrorException('Failed to send email.');
//     }
//   }
// }

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailDto } from './dto/send-email.dto.js';
import resendConfig from '../common/config/resend.config.js';

@Injectable()
export class MailService {
  private readonly resend: Resend;

  constructor(
    @Inject(resendConfig.KEY)
    private readonly config: ConfigType<typeof resendConfig>,
  ) {
    this.resend = new Resend(config.key);
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { recipient, subject, html } = sendEmailDto;

    const { data, error } = await this.resend.emails.send({
      from: this.config.email || 'noreply@diplom.com',
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new InternalServerErrorException('Failed to send email.');
    }

    return data;
  }
}
