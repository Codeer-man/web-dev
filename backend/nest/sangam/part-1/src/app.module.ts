import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import * as joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post/entities/post.entities';

@Module({
  imports: [
    //config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        APP_NAME: joi.string().default('name'),
      }),
    }),
    // typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Post],
      synchronize: true, // in development
    }),
    HelloModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
