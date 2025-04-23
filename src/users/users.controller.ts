import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UserUpdateResponseDto } from './dto/user-update-response.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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

  @ApiOperation({ summary: 'Listar todos os usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários.',
  })
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuário por ID.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
  })
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar usuário.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiBody({
    description: 'Dados para atualização do usuário.',
    type: UserUpdateRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    type: UserUpdateResponseDto,
  })
  @ApiBearerAuth()
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userUpdateRequestDto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    return this.usersService.updateUser(id, userUpdateRequestDto);
  }

  @ApiOperation({ summary: 'Deletar usuário.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso.' };
  }
}
