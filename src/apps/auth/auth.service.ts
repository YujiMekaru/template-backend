import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './response/auth.response';
import { AuthDto } from './request/auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/data/entities/users.entity';
import { RegisterDto } from './request/register.dto';
import { RegisterResponse } from './response/register.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTransaction } from 'src/utils/create-transaction.util';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmEmailDto } from './request/confirm-email.dto';
import { SimpleMessageResponse } from '../shared/response/simple-message.response';
import { ForgetPasswordDto } from './request/forget-password.dto';
import { ResetPasswordDto } from './request/reset-password.dto';
import { MailerService } from '../shared/mailer/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private mailService: MailerService,

        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async login(authDto: AuthDto): Promise<AuthResponse> {
        const { email, password } = authDto;

        const user = await this.usersService.findUserByEmail(email);

        if (!user) throw new BadRequestException('Credenciais inválidas.');

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            throw new BadRequestException('Credenciais inválidas.');

        if (!user.emailConfirmed)
            throw new BadRequestException('Email não Verificado');

        const tokenPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            role: user.role,
        };

        const token = this.jwtService.sign(tokenPayload);

        return { token };
    }

    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
        const { name, cpf, email, password } = registerDto;

        const userExists = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .orWhere('user.cpf = :cpf', { cpf })
            .getOne();

        if (userExists && userExists.emailConfirmed)
            throw new BadRequestException('CPF ou Email já cadastrado.');

        const queryRunner = await createTransaction();
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const confirmationToken = uuidv4();

            const newUser = await queryRunner.manager.save(Users, {
                id: userExists ? userExists.id : undefined,
                name,
                cpf,
                email,
                password: hash,
                emailConfirmed: false,
                confirmationToken,
            });

            await this.mailService.sendMail(
                email,
                'Confirme seu email',
                'register-email',
                {
                    name,
                    url: confirmationToken,
                }
            );

            queryRunner.commitTransaction();
            return {
                id: newUser.id,
                message: 'Acesse o email registrado para finalizar o cadastro.',
            };
        } catch (err) {
            queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(
                'Erro ao cadastrar novo usuario: ' + err,
            );
        }
    }

    async confirmEmail(
        confirmEmailDto: ConfirmEmailDto,
    ): Promise<SimpleMessageResponse> {
        const { email, confirmationToken } = confirmEmailDto;

        const tokenIsValid = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.confirmationToken = :confirmationToken', {
                confirmationToken,
            })
            .getOne();

        if (!tokenIsValid)
            throw new BadRequestException(
                'Token de Confirmação ou Email inválido.',
            );

        tokenIsValid.emailConfirmed = true;

        await this.usersRepository.save(tokenIsValid);

        return { message: 'Email confirmado com sucesso!' };
    }

    async forgetPassword(
        forgetPasswordDto: ForgetPasswordDto,
    ): Promise<SimpleMessageResponse> {
        const { email } = forgetPasswordDto;

        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        if (user) {
            const newToken = uuidv4();

            await this.usersRepository.save({
                ...user,
                resetPasswordToken: newToken,
            });

            await this.mailService.sendMail(
                email,
                'Resetar senha',
                'reset-password',
                {
                    user: user.name,
                    url: newToken,
                },
            );
        }

        return { message: 'Email enviado.' };
    }

    async resetPassword(
        resetPasswordDto: ResetPasswordDto,
    ): Promise<SimpleMessageResponse> {
        const { password, confirmPassword, resetPasswordToken } =
            resetPasswordDto;

        if (password != confirmPassword)
            throw new BadRequestException('Senhas não conferem');

        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.resetPasswordToken = :resetPasswordToken', {
                resetPasswordToken,
            })
            .getOne();

        if (!user) throw new BadRequestException('Token inválido');

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await this.usersRepository.save({
            ...user,
            password: hash,
            resetPasswordToken: null,
        });

        return { message: 'Senha alterada com sucesso!' };
    }
}
