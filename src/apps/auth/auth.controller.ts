import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './response/auth.response';
import { AuthDto } from './request/auth.dto';
import { RegisterResponse } from './response/register.response';
import { RegisterDto } from './request/register.dto';
import { ConfirmEmailDto } from './request/confirm-email.dto';
import { SimpleMessageResponse } from '../shared/response/simple-message.response';
import { ForgetPasswordDto } from './request/forget-password.dto';
import { ResetPasswordDto } from './request/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status: 200, type: AuthResponse })
    @ApiBody({ type: AuthDto })
    login(@Body() authDto: AuthDto): Promise<AuthResponse> {
        return this.authService.login(authDto);
    }

    @Post('register')
    @ApiResponse({ status: 201, type: RegisterResponse })
    @ApiBody({ type: RegisterDto })
    register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(registerDto);
    }

    @Post('confirm-email')
    @ApiResponse({ status: 200, type: SimpleMessageResponse })
    @ApiBody({ type: ConfirmEmailDto })
    confirmEmail(
        @Body() confirmEmailDto: ConfirmEmailDto,
    ): Promise<SimpleMessageResponse> {
        return this.authService.confirmEmail(confirmEmailDto);
    }

    @Post('forget-password')
    @ApiResponse({ status: 200, type: SimpleMessageResponse })
    @ApiBody({ type: ForgetPasswordDto })
    forgetPassword(
        @Body() forgetPasswordDto: ForgetPasswordDto,
    ): Promise<SimpleMessageResponse> {
        return this.authService.forgetPassword(forgetPasswordDto);
    }

    @Post('reset-password')
    @ApiResponse({ status: 200, type: SimpleMessageResponse })
    @ApiBody({ type: ResetPasswordDto })
    resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
    ): Promise<SimpleMessageResponse> {
        return this.authService.resetPassword(resetPasswordDto);
    }
}
