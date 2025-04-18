import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseOptions from './config/database/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apps/auth/auth.module';
import { UsersModule } from './apps/users/users.module';
import { JwtStrategy } from './apps/auth/jwt/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config/mailer.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({ ...databaseOptions, autoLoadEntities: true }),
        MailerModule.forRoot(mailerConfig),
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {}
