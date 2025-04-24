import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { ExternalUsersService } from '../users/services/external-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserAuthenticated } from './interfaces/user-authenticated';
import { ExternalUserAuthenticated } from './interfaces/external-user-authenticated';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private externalUserService: ExternalUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email_institucional: string,
    senha: string,
  ): Promise<UserAuthenticated> {
    const user = await this.usersService.findByEmail(email_institucional);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const { senha: _, ...result } = user;
    return result as UserAuthenticated;
  }

  async validateExternalUser(
    chave_acesso: string,
  ): Promise<ExternalUserAuthenticated> {
    const external_user =
      await this.externalUserService.findByAccessKey(chave_acesso);
    if (!external_user) {
      throw new UnauthorizedException('Código de acesso inválido.');
    }

    const { chave_acesso: _, ...result } = external_user;

    return result as ExternalUserAuthenticated;
  }

  async login(user: UserAuthenticated): Promise<UserLoginResponseDto> {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }

  async externalLogin(
    external_user: ExternalUserAuthenticated,
  ): Promise<UserLoginResponseDto> {
    return {
      access_token: await this.jwtService.signAsync(external_user, {
        expiresIn: '10m',
      }),
    };
  }
}
