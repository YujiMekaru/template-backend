import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsString } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ name: 'password', example: '123456', required: true })
    @IsDefined()
    @IsString()
    password: string;

    @ApiProperty({ name: 'confirmPassword', example: '123456', required: true })
    @IsDefined()
    @IsString()
    confirmPassword: string;

    @ApiProperty({
        name: 'resetPasswordToken',
        example: '123456',
        required: true,
    })
    @IsDefined()
    @IsString()
    resetPasswordToken: string;
}
