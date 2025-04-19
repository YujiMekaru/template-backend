import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private readonly templatesDir = path.resolve(__dirname, 'mail-templates');

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: +this.config.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: this.templatesDir,
          defaultLayout: false,
        },
        viewPath: this.templatesDir,
        extName: '.hbs',
      })
    );

    this.transporter.verify(err => {
      if (err) {
        console.error('❌ SMTP connection error:', err);
      } else {
        console.log('✅ SMTP server is ready to take messages');
      }
    });
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    try {
      await this.transporter.sendMail({
        from: `"No Reply" <${this.config.get('SMTP_FROM')}>`,
        to,
        subject,
        template,
        context,
      } as any);
      console.log(`Mail sent to: `, to);
    } catch (err) {
      console.error('❌ Failed to send email:', err);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}