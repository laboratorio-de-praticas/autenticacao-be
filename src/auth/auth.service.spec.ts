import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from './interfaces/authenticated-user';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UsuarioStatus } from 'src/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockUser = {
    id: 1,
    email_institucional: 'test@example.com',
    senha: 'hashedPassword',
  };

  const authenticatedUser: AuthenticatedUser = {
    id: 1,
    email_institucional: 'test@example.com',
    status_usuario: UsuarioStatus.ATIVO,
  };

  const mockLoginResponse: UserLoginResponseDto = {
    access_token: 'access_token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    mockUsersService.findByEmail.mockReset();
    mockJwtService.signAsync.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return an authenticated user when email and password are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockImplementation(bcryptCompare);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(result).toEqual({
        id: authenticatedUser.id,
        email_institucional: authenticatedUser.email_institucional,
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.validateUser('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(false);
      jest.spyOn(bcrypt, 'compare').mockImplementation(bcryptCompare);

      await expect(
        authService.validateUser('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      mockJwtService.signAsync.mockResolvedValue('access_token');

      const result = await authService.login(authenticatedUser);

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(authenticatedUser);
      expect(result).toEqual(mockLoginResponse);
    });

    it('should throw an error if JWT singning fails', async () => {
      mockJwtService.signAsync.mockRejectedValue(
        new Error('Error signing JWT'),
      );

      await expect(authService.login(authenticatedUser)).rejects.toThrow(
        'Error signing JWT',
      );
    });
  });
});
