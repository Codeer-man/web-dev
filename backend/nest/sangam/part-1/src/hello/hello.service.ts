import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class HelloService {
  constructor(private readonly configService: ConfigService) {}

  getEnv(): string {
    const name = this.configService.get<string>('APP_NAME', 'default_value');
    console.log(name);

    return name;
  }

  getHello(): string {
    return 'hello';
  }

  getHelloParams(name: string) {
    return `hello ${name}`;
  }
}
