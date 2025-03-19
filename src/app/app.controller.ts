import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AppService } from './app.service';
import { Public } from 'src/auth/constants';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { UserProfileDto } from 'src/auth/dto/user-profile.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @ApiOperation({ summary: 'Realiza o Login do usuário com email e senha.' })
  @ApiResponse({ status: 200, description: 'Sucesso no login.' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req: object): Promise<LoginUserResponseDto> {
    return this.authService.login(req.user);
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  getProfile(@Request() req): Promise<UserProfileDto> {
    return req.user;
  }
}
