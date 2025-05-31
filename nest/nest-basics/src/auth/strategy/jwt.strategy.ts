import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

// verify or decode the token to get the user data
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_ACCESS_TOKEN',
    });
  }
  async validate(payload: any) {
    try {
      const user = this.authService.getUserById(payload.sub);

      return {
        ...user,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
