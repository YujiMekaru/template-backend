import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ name: 'name', example: 'string', required: true })
    @IsDefined()
    @IsEmail()
    name: string;

    @ApiProperty({ name: 'cpf', example: '123.123.123-23', required: true })
    @IsDefined()
    cpf: string;

    @ApiProperty({ name: 'email', example: 'email@email.com', required: true })
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty({ name: 'password', example: '123456', required: true })
    @IsDefined()
    @IsString()
    password: string;
}
