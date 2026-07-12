import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from  "joi";
import appConfig from './config/app.config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal:true,
    //   validationSchema: joi.object({
    //     APP_NAME : joi.string().default("Default_value")
    //   })
    load: [appConfig],
     }) ,
    HelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
