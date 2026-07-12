import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    //DI : dependency injection is design patter where a object receives it's require dependency from external source rather than create it

    //constructor is used it initialize a newly create object and allocate it's require resources
    constructor( private readonly helloService:HelloService){}
    
    @Get()
    getHello():string{
        return this.helloService.getHello();
    }

    @Get("user/:name")
    getHelloFromParams(@Param ('name') name:string ):string{
        return this.helloService.getHelloFromParams(name)
    }

}
