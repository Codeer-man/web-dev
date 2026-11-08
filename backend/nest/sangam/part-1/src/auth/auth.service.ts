import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entities';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.authRepo.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.genHashPassword(registerDto.password);

    const newlyCreatedUser = this.authRepo.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
    });

    const saveUser = await this.authRepo.save(newlyCreatedUser);

    const { password, ...result } = saveUser;

    return {
      user: result,
      message: ' User registered successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepo.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await this.verifyPwd(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //generate token
    const token = this.generateTokens(user.id, user.role);

    const { password, ...result } = user;

    return {
      token: token,
      user: result,
    };
  }

  async getUserById(id: number) {
    const user = await this.authRepo.findOneBy({ id: id });
    // const user = this.authRepo.findOne({ where: { id: id } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;

    return result;
  }

  private async genHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async verifyPwd(password: string, hashedPwd: string) {
    return await bcrypt.compare(password, hashedPwd);
  }

  private generateTokens(id: number, role: string) {
    return {
      generateAccessToken: this.genAccessToken(id, role),
      generateRefreshToken: this.genRefreshToken(id),
    };
  }

  private genAccessToken(id: number, role: string) {
    const payload = {
      id: id,
      role: role,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_JWT_SECERT'),
      expiresIn: this.configService.get<string>(
        'ACCESS_EXPIRES_IN',
      ) as JwtSignOptions['expiresIn'],
    });
  }

  private genRefreshToken(id: number) {
    return this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('REFRESH_JWT_SECERT'),
        expiresIn: this.configService.get<string>(
          'REFRESH_EXPIRES_IN',
        ) as JwtSignOptions['expiresIn'],
      },
    );
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decodeToken = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_JWT_SECERT'),
      });

      const user = await this.authRepo.findOne({
        where: { id: decodeToken.id },
      });

      if (!user) {
        throw new ForbiddenException('Invalid refresh auth');
      }

      const newAccessToken = this.genAccessToken(user.id, user.role);

      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Invalid token',
      );
    }
  }
}
