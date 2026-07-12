import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {

    getHello():string{
        return "hello"
    }

    getHelloFromParams(name:string):string{
        return `Hello ${name}`
    }
}
