import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/data/entities/users.entity';
import { Repository } from 'typeorm';
import { GetUserResponse } from './response/get-user.response';
import { GetAllUserResponse } from './response/get-all-user.response';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { GetByIdDto } from './request/get-by-id.dto';
import { GetAllUsersDto } from './request/get-all-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findUserById(id: number): Promise<Users | null> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        return user;
    }

    async findUserByEmail(email: string): Promise<Users | null> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        return user;
    }

    async getAll(
        getAllFiltersDto: GetAllUsersDto,
    ): Promise<GetAllUserResponse> {
        const { pageSize, pageNumber } = getAllFiltersDto;

        const users = await this.usersRepository.findAndCount({
            take: pageSize,
            skip: (pageNumber - 1) * pageSize,
        });

        return {
            currentPage: Number(getAllFiltersDto.pageNumber),
            pageCount: Math.ceil(users[1] / pageSize),
            itemCount: users[1],
            items: plainToInstance(GetUserResponse, users[0]),
        };
    }

    async getById(getByIdDto: GetByIdDto): Promise<GetUserResponse> {
        const { id } = getByIdDto;

        const user = await this.usersRepository.findOne({
            where: { id: Number(id) },
        });

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return plainToInstance(GetUserResponse, user);
    }
}
