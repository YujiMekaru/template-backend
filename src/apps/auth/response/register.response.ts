import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
    @ApiProperty({ name: 'id', example: '1' })
    id: number;

    @ApiProperty({ name: 'message', example: 'string' })
    message: string;
}
