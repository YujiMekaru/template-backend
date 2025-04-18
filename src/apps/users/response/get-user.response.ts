import { ApiProperty } from '@nestjs/swagger';

import { UserRoleEnum } from 'src/enums/user-role.enum';

export class GetUserResponse {
    @ApiProperty({ name: 'id', example: 1 })
    id: number;

    @ApiProperty({ name: 'name', example: 'John' })
    name: string;

    @ApiProperty({ name: 'cpf', example: '123.123.123-56' })
    cpf: string;

    @ApiProperty({ name: 'email', example: 'email@email.com' })
    email: string;

    @ApiProperty({ name: 'profilePictureUrl', example: 'url.com' })
    profilePictureUrl: string;

    @ApiProperty({ name: 'role', example: UserRoleEnum.USER })
    role: UserRoleEnum;

    @ApiProperty({ name: 'emailConfirmed', example: true })
    emailConfirmed: boolean;

    @ApiProperty({ name: 'createdAt', example: '2024-07-31' })
    createdAt: Date;

    @ApiProperty({ name: 'updatedAt', example: '2024-07-31' })
    updatedAt: Date;

    @ApiProperty({ name: 'deletedAt', example: '2024-07-31' })
    deletedAt: Date;
}
