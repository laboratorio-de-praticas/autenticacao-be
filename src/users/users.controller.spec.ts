import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UsuarioStatus, UsuarioTipos } from 'src/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService: Partial<Record<keyof UsersService, jest.Mock>> = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const userCreateRequestDto: UserCreateRequestDto = {
    nome: 'Test User',
    email_institucional: 'test@example.com',
    senha: 'password123',
  };

  const userCreateResponseDto: UserCreateResponseDto = {
    id: 1,
    message: 'Usuário criado com sucesso.',
  };

  const userUpdateRequestDto: UserUpdateRequestDto = {
    nome: 'Updated User',
    email_institucional: 'updated@example.com',
    senha: 'newpass123',
    tipo_usuario: UsuarioTipos.ATENDENTE,
    status_usuario: UsuarioStatus.ATIVO,
  };

  const existingUser = {
    id: 1,
    nome: 'John Doe',
    email_institucional: 'john@example.com',
    tipo_usuario: UsuarioTipos.ATENDENTE,
    status_usuario: UsuarioStatus.ATIVO,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      jest.spyOn(usersService, 'findAll').mockResolvedValue([existingUser]);

      const result = await controller.findAll();

      expect(result).toEqual([existingUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(existingUser);

      const result = await controller.findOne(existingUser.id);

      expect(result).toEqual(existingUser);
      expect(usersService.findOne).toHaveBeenCalledWith(existingUser.id);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      jest.spyOn(usersService, 'updateUser').mockResolvedValue({
        id: existingUser.id,
        message: 'Usuário atualizado com sucesso.',
      });

      const result = await controller.updateUser(
        existingUser.id,
        userUpdateRequestDto,
      );

      expect(result).toEqual({
        id: existingUser.id,
        message: 'Usuário atualizado com sucesso.',
      });
      expect(usersService.updateUser).toHaveBeenCalledWith(
        existingUser.id,
        userUpdateRequestDto,
      );
    });

    describe('deleteUser', () => {
      it('should delete a user', async () => {
        const result = await controller.deleteUser(existingUser.id);

        expect(result).toEqual({ message: 'Usuário deletado com sucesso.' });
        expect(usersService.deleteUser).toHaveBeenCalledWith(existingUser.id);
      });
    });
  });
});
