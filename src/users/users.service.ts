import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import * as bcrypt from 'bcrypt';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UserUpdateResponseDto } from './dto/user-update-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createUser(
    createUserDto: UserCreateRequestDto,
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
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async updateUser(
    id: number,
    dto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.findOne(id);

    // Verifica se o e-mail está sendo atualizado e se já existe
    if (dto.email && dto.email !== user.email) {
      const userExists = await this.usersRepository.findOneBy({ email: dto.email });
      if (userExists) {
        throw new ConflictException('Este e-mail já está em uso.');
      }
    }

    // Se a senha for atualizada, faz o hash dela
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    await this.usersRepository.update(id, dto);

    return { id, message: 'Usuário atualizado com sucesso.' };
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
  }
}