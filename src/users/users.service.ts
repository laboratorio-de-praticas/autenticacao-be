import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'leal@leal',
      password: 'matilda',
      isActive: true,
    },
    {
      id: 2,
      email: 'ana@ana',
      password: 'tereza',
      isActive: true,
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
