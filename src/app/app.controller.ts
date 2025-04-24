import {
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Req,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AppService } from './app.service';
import { Public } from 'src/auth/constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginResponseDto } from 'src/auth/dto/user-login-response.dto';
import { UserAuthenticatedRequest } from 'src/auth/interfaces/user-authenticated-request';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UserLoginRequestDto } from 'src/auth/dto/user-login-request.dto';
import { ExternalUserLoginRequestDto } from 'src/auth/dto/external-user-login-request.dto';

@ApiTags('Autenticação')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @ApiOperation({ summary: 'Hello Word da API.' })
  @ApiResponse({
    status: 200,
    description: 'A API está de pé!.',
    schema: {
      example: 'Hello Word!',
    },
  })
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Realiza o Login do usuário com email e senha.' })
  @ApiBody({
    description: 'Dados necessários para realizar o login.',
    type: UserLoginRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso no login.',
    type: UserLoginResponseDto,
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/user/login')
  @HttpCode(200)
  async login(
    @Req() req: UserAuthenticatedRequest,
  ): Promise<UserLoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Valida e retorna o token do visitante.' })
  @ApiBody({
    description: 'Dados necessários para realizar o cadastro do visitante.',
    type: ExternalUserLoginRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Cadastro do visitante realizado com sucesso.',
    type: UserLoginResponseDto,
  })
  @Public()
  @Post('auth/external-user/login')
  async externalLogin(
    @Body('chave_acesso') access_key: string,
  ): Promise<UserLoginResponseDto> {
    const user = await this.authService.validateExternalUser(access_key);
    return await this.authService.externalLogin(user);
  }

  @ApiOperation({
    summary: 'Retorna informações do usuário com base no token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso.',
  })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Req() req: UserAuthenticatedRequest): JwtPayload {
    return req.user;
  }
}
