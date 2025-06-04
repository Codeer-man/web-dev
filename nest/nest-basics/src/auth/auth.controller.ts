import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserRole } from './entities/user.entities';
import { RoleGuard } from './guards/roles.guard';
import { Roles } from './decorator/role.decorator';
import { loginThrottlerLimit } from './guards/login.throttler.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  Register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(loginThrottlerLimit)
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.Login(loginDto);
  }

  @Post('refresh-token')
  refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Post('create-admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  createAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.CreateAdmin(registerDto);
  }
}
