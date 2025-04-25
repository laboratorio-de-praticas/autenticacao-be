import { Body, Controller, Post } from '@nestjs/common';
import { ExternalUsersService } from '../services/external-users.service';
import { Public } from 'src/auth/constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExternalUserCreateRequestDto } from '../dto/external-user-create-request.dto';
import { ExternalUserCreateResponseDto } from '../dto/external-user-create-response.dto';

@ApiTags('Usuário Externo')
@Controller('external-users')
export class ExternalUsersController {
  constructor(private readonly externalUsersService: ExternalUsersService) {}

  @ApiOperation({ summary: 'Criação do cadastro temporario do visitante.' })
  @ApiBody({
    description: 'Dados necessários para realizar o cadastro do visitante.',
    type: ExternalUserCreateRequestDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Cadastro do visitante realizado com sucesso.',
    type: ExternalUserCreateResponseDto,
  })
  @Public()
  @Post('create')
  async createExternalUser(
    @Body() userCreateExternalRequestDto: ExternalUserCreateRequestDto,
  ): Promise<ExternalUserCreateResponseDto> {
    return this.externalUsersService.createExternalUser(
      userCreateExternalRequestDto,
    );
  }
}
