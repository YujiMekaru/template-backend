import { ApiProperty } from '@nestjs/swagger';

export class SimpleMessageResponse {
    @ApiProperty({ name: 'message' })
    message: string;
}
