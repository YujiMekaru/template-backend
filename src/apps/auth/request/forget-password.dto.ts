import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail } from 'class-validator';

export class ForgetPasswordDto {
    @ApiProperty({ name: 'email', example: 'email@email.com', required: true })
    @IsDefined()
    @IsEmail()
    email: string;
}
