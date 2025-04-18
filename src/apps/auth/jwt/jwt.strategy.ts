import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/apps/users/users.service';
import { CurrentUserDto } from '../request/current-user.dto';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate(payload): Promise<CurrentUserDto> {
        const user = await this.usersService.findUserById(payload.id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            cpf: payload.cpf,
        };
    }
}
