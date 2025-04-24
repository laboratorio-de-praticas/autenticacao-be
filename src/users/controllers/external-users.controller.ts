import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ExternalUsersService } from '../services/external-users.service';
import { Public } from 'src/auth/constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExternalUserCreateRequestDto } from '../dto/external-user-create-request.dto';
import { ExternalUserCreateResponseDto } from '../dto/external-user-create-response.dto';
import { VisitorLocalAuthGuard } from 'src/auth/guards/visitor-local-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { ExternalUserAuthenticatedRequest } from 'src/auth/interfaces/external-user-authenticated-request';
import { UserLoginResponseDto } from 'src/auth/dto/user-login-response.dto';
import { ExternalUserLoginRequestDto } from 'src/auth/dto/external-user-login-request.dto';

@ApiTags('Usuário Externo')
@Controller('external-users')
export class ExternalUsersController {
  constructor(
    private readonly externalUsersService: ExternalUsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Criação do cadastro temporario do visitante.' })
  @ApiBody({
    description: 'Dados necessários para realizar o cadastro do visitante.',
    type: ExternalUserCreateRequestDto,
  })
  @ApiResponse({
    status: 200,
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
