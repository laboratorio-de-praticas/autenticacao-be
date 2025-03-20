import {
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Req,
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
import { UserProfileResponseDto } from 'src/auth/dto/user-profile-response.dto';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UserLoginRequestDto } from 'src/auth/dto/user-login-request.dto';

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
  @Post('auth/login')
  @HttpCode(200)
  async login(@Req() req: AuthenticatedRequest): Promise<UserLoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Retorna informações do usuário com base no token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso.',
    type: UserProfileResponseDto,
  })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(
    @Req() req: AuthenticatedRequest,
  ): Promise<UserProfileResponseDto> {
    const profile: UserProfileResponseDto = {
      id: req.user.id,
      email: req.user.email,
    };

    return Promise.resolve(profile);
  }
}
