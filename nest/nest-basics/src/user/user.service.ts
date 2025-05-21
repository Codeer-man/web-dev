import { ConflictException, Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  constructor(private readonly helloService: HelloService) {}

  getAllUser() {
    return [
      {
        id: 1,
        name: 'man',
      },
      {
        id: 2,
        name: 'asta',
      },
      {
        id: 3,
        name: 'mana',
      },
    ];
  }

  getUserById(id: number) {
    const user = this.getAllUser().find((user) => user.id === id);
    return user;
  }

  getWelcomeMessage(userId: number) {
    const user = this.getUserById(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }

    return this.helloService.getHelloWithName(user.name);
  }
}
