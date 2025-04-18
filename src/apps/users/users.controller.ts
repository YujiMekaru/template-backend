import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Query, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { GetAllUserResponse } from './response/get-all-user.response';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Roles } from '../auth/jwt/user-roles.decorator';
import { GetUserResponse } from './response/get-user.response';
import { GetByIdDto } from './request/get-by-id.dto';
import { GetAllUsersDto } from './request/get-all-users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Roles(UserRoleEnum.ADMIN)
    @ApiResponse({ status: 200, type: GetAllUserResponse })
    getAll(
        @Query() getAllFiltersDto: GetAllUsersDto,
    ): Promise<GetAllUserResponse> {
        return this.usersService.getAll(getAllFiltersDto);
    }

    @Get('/:id')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Roles(UserRoleEnum.ADMIN)
    @ApiResponse({ status: 200, type: GetUserResponse })
    getById(@Param() getByIdDto: GetByIdDto): Promise<GetUserResponse> {
        return this.usersService.getById(getByIdDto);
    }
}
