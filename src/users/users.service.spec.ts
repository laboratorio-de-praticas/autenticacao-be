import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const createUserDto = { email: 'test@example.com', password: 'password123' };

  const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

  const existingUser = {
    id: 1,
    email: 'test@example.com',
    password: hashedPassword,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    mockUsersRepository.findOneBy.mockReset();
    mockUsersRepository.create.mockReset();
    mockUsersRepository.save.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should throw ConflictException if user already exists', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(existingUser);

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
    });

    it('should create a new user', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);
      mockUsersRepository.create.mockReturnValue(existingUser);
      mockUsersRepository.save.mockResolvedValue(existingUser);
      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue(existingUser.password as never);

      const result = await service.createUser(createUserDto);

      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        email: createUserDto.email,
        password: existingUser.password,
      });
      expect(mockUsersRepository.save).toHaveBeenCalledWith(existingUser);
      expect(result).toEqual({
        id: existingUser.id,
        message: 'Usuário criado com sucesso.',
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(existingUser);

      const result = await service.findByEmail(existingUser.email);

      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        email: existingUser.email,
      });
      expect(result).toEqual(existingUser);
    });

    it('should return null if user not found', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findByEmail(existingUser.email);

      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        email: existingUser.email,
      });
      expect(result).toBeNull();
    });
  });
});
