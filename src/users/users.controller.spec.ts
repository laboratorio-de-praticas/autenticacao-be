import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService: Partial<Record<keyof UsersService, jest.Mock>> = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(), // <== Adicionado corretamente
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };


  const userCreateRequestDto: UserCreateRequestDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const userCreateResponseDto: UserCreateResponseDto = {
    id: 1,
    message: 'Usuário criado com sucesso.',
  };

  const userUpdateRequestDto: UserUpdateRequestDto = {
    email: 'updated@example.com',
    password: 'newpass123',
  };

  const existingUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    isActive: true, // Adicione essa propriedade se for necessária
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

      const result = await controller.updateUser(existingUser.id, userUpdateRequestDto);

      expect(result).toEqual({
        id: existingUser.id,
        message: 'Usuário atualizado com sucesso.',
      });
      expect(usersService.updateUser).toHaveBeenCalledWith(existingUser.id, userUpdateRequestDto);
    });



    describe('deleteUser', () => {
      it('should delete a user', async () => {
        const result = await controller.deleteUser(existingUser.id);

        expect(result).toEqual({ message: 'Usuário deletado com sucesso.' });
        expect(usersService.deleteUser).toHaveBeenCalledWith(existingUser.id);
      });
    });
  })
})
