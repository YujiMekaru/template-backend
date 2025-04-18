import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { ROLES_KEY } from './user-roles.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAuth = await super.canActivate(context);
        if (!isAuth) {
            return false;
        }

        const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userRole = request.user.role;

        return requiredRoles.some((role) => userRole === role);
    }
}
