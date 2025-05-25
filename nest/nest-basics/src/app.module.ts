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
      entities: [Post], // arrya of entitites (model in mongoose) to register
      synchronize: true, // only in development
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
