import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail, isString, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ name: 'name', example: 'string', required: true })
    @IsDefined()
    @IsString()
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
