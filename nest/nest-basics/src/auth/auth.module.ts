import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    // passport module
    PassportModule,

    // configure jwt
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService], //jwt service ,roles guards
  exports: [AuthService],
})
export class AuthModule {}
