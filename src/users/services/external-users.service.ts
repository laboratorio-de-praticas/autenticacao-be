import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Visitor } from '../../entities/external-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalUserCreateRequestDto } from '../dto/external-user-create-request.dto';
import { ExternalUserCreateResponseDto } from '../dto/external-user-create-response.dto';

@Injectable()
export class ExternalUsersService {
  constructor(
    @InjectRepository(Visitor)
    private visitorsRepository: Repository<Visitor>,
  ) {}

  private async generateUniqueAccessKey(retries = 5): Promise<string> {
    for (let i = 0; i < retries; i++) {
      const access_key = Math.floor(1000 + Math.random() * 9000).toString();
      const exists = await this.visitorsRepository.findOne({
        where: { chave_acesso: access_key },
      });
      if (!exists) return access_key;
    }
    throw new InternalServerErrorException(
      'Não foi possível gerar um código único após várias tentativas.',
    );
  }

  async createExternalUser(
    createExternalUserDto: ExternalUserCreateRequestDto,
  ): Promise<ExternalUserCreateResponseDto> {
    const access_key = await this.generateUniqueAccessKey();
    const newVisitor = this.visitorsRepository.create({
      chave_acesso: access_key,
      ...createExternalUserDto,
    });

    await this.visitorsRepository.save(newVisitor);

    return {
      message: 'Cadastro do visitante realizado com sucesso.',
      chave_acesso: access_key,
    };
  }

  async findByAccessKey(access_key: string): Promise<Visitor | null> {
    return await this.visitorsRepository.findOneBy({
      chave_acesso: access_key,
    });
  }
}
