import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create-request.dto';
import * as bcrypt from 'bcrypt';
import { UserCreateResponseDto } from './dto/user-create-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: UserCreateDto,
  ): Promise<UserCreateResponseDto> {
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
