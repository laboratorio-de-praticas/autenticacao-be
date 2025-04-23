import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UsuarioStatus } from '../entities/user.entity';
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
  ) {}

  async createUser(
    createUserDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    const userExists = await this.usersRepository.findOneBy({
      email_institucional: createUserDto.email_institucional,
    });
    if (userExists) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
    const user = this.usersRepository.create({
      nome: createUserDto.nome,
      email_institucional: createUserDto.email_institucional,
      senha: hashedPassword,
    });

    await this.usersRepository.save(user);

    return {
      id: user.id,
      message: 'Usuário criado com sucesso.',
    };
  }

  async findByEmail(email_institucional: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email_institucional });
  }
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ senha, ...user }) => user);
  }

  async findOne(id: number): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    const { senha: _, ...result } = user;
    return result;
  }

  async updateUser(
    id: number,
    dto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.findOne(id);

    // Verifica se o e-mail está sendo atualizado e se já existe
    if (
      dto.email_institucional &&
      dto.email_institucional !== user.email_institucional
    ) {
      const userExists = await this.usersRepository.findOneBy({
        email_institucional: dto.email_institucional,
      });
      if (userExists) {
        throw new ConflictException('Este e-mail já está em uso.');
      }
    }

    // Se a senha for atualizada, faz o hash dela
    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    Object.assign(user, dto);
    await this.usersRepository.save(user);

    return { id, message: 'Usuário atualizado com sucesso.' };
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.status_usuario = UsuarioStatus.DESLIGADO;
    await this.usersRepository.save(user);
  }
}
