import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtservice: JwtService,
  ) {}

  //   handle new user
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exits');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newlyCreatedUser = await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    const { password: _, ...result } = newlyCreatedUser;

    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) {
      throw new UnauthorizedException('Invalid credential , Please try again');
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid credential , Please try again');
    }

    const token = this.jwtservice.sign({
      id: findUser.id,
    });

    const { password: _, ...result } = findUser;

    return { ...result, token };
  }
}
