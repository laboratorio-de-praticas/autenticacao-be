import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from './dto/user-create-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const userExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return {
      id: user.id,
      message: 'Usuário criado com sucesso.',
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
