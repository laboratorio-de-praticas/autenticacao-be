import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criação do usuário.' })
  @ApiResponse({ status: 200, description: 'Usuário criado com sucesso.' })
  @Public()
  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUser(createUserDto);
  }
}
