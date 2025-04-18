import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({ name: 'token', example: '456465132165463132' })
    token: string;
}
