import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as Path from 'path';
export const mailerConfig: MailerOptions = {
    transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
    defaults: {
        from: `"No Reply" <${process.env.SMTP_FROM}>`,
    },
    template: {
        dir: Path.resolve(__dirname, '..', '..', 'mail-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            extName: '.hbs',
            layoutDir: Path.resolve(__dirname, '..', '..', 'mail-templates'),
        },
    },
};
