import { ApiProperty } from '@nestjs/swagger';

import { GetUserResponse } from './get-user.response';

export class GetAllUserResponse {
    @ApiProperty({ name: 'currentPage' })
    currentPage: number;

    @ApiProperty({ name: 'pageCount' })
    pageCount: number;

    @ApiProperty({ name: 'itemCount' })
    itemCount: number;

    @ApiProperty({ name: 'items' })
    items: GetUserResponse[];
}
