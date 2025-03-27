import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService: Partial<UsersService> = {
    createUser: jest.fn(),
  };

  const userCreateRequestDto: UserCreateRequestDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const userCreateResponseDto: UserCreateResponseDto = {
    id: 1,
    message: 'Usuário criado com sucesso.',
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

  describe('createUser', () => {
    it('should call UsersService.createUser with the correct parameters', async () => {
      const createUserSpy = jest
        .spyOn(usersService, 'createUser')
        .mockResolvedValue(userCreateResponseDto);

      const result = await controller.createUser(userCreateRequestDto);

      expect(createUserSpy).toHaveBeenCalledWith(userCreateRequestDto);
      expect(result).toEqual(userCreateResponseDto);
    });

    it('should throw an error if UsersService.createUser fails', async () => {
      const createUserSpy = jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValue(new Error('Error creating user'));

      await expect(controller.createUser(userCreateRequestDto)).rejects.toThrow(
        'Error creating user',
      );
      expect(createUserSpy).toHaveBeenCalledWith(userCreateRequestDto);
    });

    // TODO: fix input validation
    // it('should throw an error for invalid input', async () => {
    //   const invalidRequestDto = { email: '', password: '' };

    //   await expect(controller.createUser(invalidRequestDto)).rejects.toThrow();
    //   expect(usersService.createUser).not.toHaveBeenCalled();
    // });
  });
});
