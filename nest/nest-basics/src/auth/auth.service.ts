import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entities';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User email already exists!');
    }

    const hashPassword = await this.hashPassword(registerDto.password);

    const newlyCreateUser = this.usersRepository.create({
      email: registerDto.email,
      name: registerDto.username,
      password: hashPassword,
      role: UserRole.USER,
    });

    const saveUser = await this.usersRepository.save(newlyCreateUser);

    const { password, ...result } = saveUser;

    return {
      user: result,
      message: 'User created successfully! Please login to continue.',
    };
  }

  async CreateAdmin(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    const hashPassword = await this.hashPassword(registerDto.password);

    const newlyCreatedUser = this.usersRepository.create({
      email: registerDto.email,
      name: registerDto.username,
      password: hashPassword,
      role: UserRole.ADMIN,
    });

    const savedUser = await this.usersRepository.save(newlyCreatedUser);

    const { password, ...result } = savedUser;

    return {
      user: result,
      message: 'Admin created successfully! Please login to continue.',
    };
  }

  async Login(loginDto: loginDto) {
    const findUser = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (
      !findUser ||
      !(await this.comparePasswords(loginDto.password, findUser.password))
    ) {
      throw new UnauthorizedException(
        'Invalid credentials or user does not exist',
      );
    }
    const { password, ...result } = findUser;
    const tokens = this.generateToken(findUser);

    return {
      user: result,
      tokens: tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'JWT_REFRESH_TOKEN',
      });

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(user);

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('invalid refresh token');
    }
  }

  private generateToken(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
      UserRole: user.role,
    };
    return this.jwtService.sign(payload, {
      secret: 'JWT_ACCESS_TOKEN',
      expiresIn: '1h',
    });
  }
  private generateRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: 'JWT_REFRESH_TOKEN',
      expiresIn: '7d',
    });
  }

  private async comparePasswords(
    PlainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(PlainPassword, hashedPassword);
  }
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private;
}
