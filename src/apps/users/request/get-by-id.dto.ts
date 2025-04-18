import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNumberString, IsString } from 'class-validator';

export class GetByIdDto {
    @ApiProperty({
        name: 'id',
        example: 10,
        required: true,
        default: 1,
    })
    @IsDefined()
    @IsString()
    @IsNumberString()
    id: string;
}
