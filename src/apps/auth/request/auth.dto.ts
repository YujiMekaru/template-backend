import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({ name: 'email', example: 'email@email.com', required: true })
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty({ name: 'password', example: '123456', required: true })
    @IsDefined()
    @IsString()
    password: string;
}
