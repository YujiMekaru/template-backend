import { UserRoleEnum } from 'src/enums/user-role.enum';

export interface CurrentUserDto {
    id: number;
    name: string;
    email: string;
    role: UserRoleEnum;
    cpf: string;
    token?: string;
}
