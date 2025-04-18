import { ApiProperty } from '@nestjs/swagger';

import { IsNumberString, IsOptional } from 'class-validator';

export class GetAllUsersDto {
    @ApiProperty({
        name: 'pageSize',
        example: 10,
        required: false,
        default: 10,
    })
    @IsOptional()
    @IsNumberString()
    pageSize: number;

    @ApiProperty({
        name: 'pageNumber',
        example: 1,
        required: false,
        default: 1,
    })
    @IsOptional()
    @IsNumberString()
    pageNumber: number;

    // TODO: Add filters
}
