import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
   
    getHello():string{
        return 'hello nest js!S'
    }

    getHelloWithName(name:string):string{
        return `hello ${name}`
    }
}
