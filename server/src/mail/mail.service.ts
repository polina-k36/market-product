import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto.js';

@Injectable()
export class MailService {
  getEmailTransport() {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    return transporter;
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { recipient, subject, html } = sendEmailDto;

    const transport = this.getEmailTransport();

    const options: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      html,
    };

    try {
      await transport.sendMail(options);
      return {
        success: true,
        message: 'Email sent successfully!',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to send email.');
    }
  }
}
