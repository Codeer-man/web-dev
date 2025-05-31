import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import * as joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post/entities/post.entities';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entities';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        App_Name: joi.string().default('data'),
      }),
    }),
    HelloModule,
    UserModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest/Js_learning',
      entities: [Post, User], // arrya of entitites (model in mongoose) to register
      synchronize: true, // only in development
    }),
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
