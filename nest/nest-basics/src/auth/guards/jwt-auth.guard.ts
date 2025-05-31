import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { extend } from 'joi';

//proctects routes that required authentication -> protected routes

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
