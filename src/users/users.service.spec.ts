import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findOneBy: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [existingUser];
      mockUsersRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(mockUsersRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      mockUsersRepository.findOne.mockResolvedValue(existingUser);

      const result = await service.findOne(existingUser.id);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
      expect(result).toEqual(existingUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(existingUser.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateDto = { email: 'updated@example.com', password: 'newpass123' };
      const updatedUser = { ...existingUser, ...updateDto };

      mockUsersRepository.findOne.mockResolvedValue(existingUser);
      mockUsersRepository.findOneBy.mockResolvedValue(null);
      mockUsersRepository.update.mockResolvedValue(updatedUser);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(Promise.resolve('hashedPassword') as never);


      const result = await service.updateUser(existingUser.id, updateDto);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
      expect(mockUsersRepository.update).toHaveBeenCalledWith(existingUser.id, {
        email: updateDto.email,
        password: 'hashedPassword',
      });
      expect(result).toEqual({ id: existingUser.id, message: 'Usuário atualizado com sucesso.' });
    });

    describe('deleteUser', () => {
      it('should delete a user', async () => {
        mockUsersRepository.findOne.mockResolvedValue(existingUser);
        mockUsersRepository.delete.mockResolvedValue(undefined);

        await expect(service.deleteUser(existingUser.id)).resolves.not.toThrow();
        expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
          where: { id: existingUser.id },
        });
        expect(mockUsersRepository.delete).toHaveBeenCalledWith(existingUser.id);
      });

      it('should throw NotFoundException if user not found', async () => {
        mockUsersRepository.findOne.mockResolvedValue(null);

        await expect(service.deleteUser(existingUser.id)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
})
