import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuário')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criação do usuário.' })
  @ApiBody({
    description: 'Dados necessários para realizar o cadastro do usuário.',
    type: UserCreateRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: UserCreateResponseDto,
  })
  @Public()
  @Post('create')
  async createUser(
    @Body() userCreateRequestDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    return this.usersService.createUser(userCreateRequestDto);
  }
}
