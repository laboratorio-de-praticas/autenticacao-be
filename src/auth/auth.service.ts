import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const { password: _, ...result } = user;
    return result as AuthenticatedUser;
  }

  async login(user: AuthenticatedUser): Promise<UserLoginResponseDto> {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
