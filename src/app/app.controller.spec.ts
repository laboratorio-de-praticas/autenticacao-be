import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UsuarioStatus, UsuarioTipos } from 'src/entities/user.entity';

describe('AppController', () => {
  let controller: AppController;

  const mockAppService = {
    getHello: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUser = {
    id: 1,
    nome: 'Test User',
    email_institucional: 'test@example.com',
    tipo_usuario: UsuarioTipos.ADMIN,
    status_usuario: UsuarioStatus.ATIVO,
  };

  const mockLoginResponse = { accessToken: 'token' };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);

    mockAppService.getHello.mockReset();
    mockAuthService.login.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call AuthService.login', async () => {
      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const req: Partial<AuthenticatedRequest> = {
        user: mockUser,
      };
      const result = await controller.login(req as AuthenticatedRequest);

      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toBe(mockLoginResponse);
    });

    it('should throw an error if AuthService.login fails', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));

      const req: Partial<AuthenticatedRequest> = {
        user: mockUser,
      };

      await expect(
        controller.login(req as AuthenticatedRequest),
      ).rejects.toThrow('Login failed');
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getProfile', () => {
    it('should return the user object from the request', () => {
      const req: Partial<AuthenticatedRequest> = {
        user: mockUser,
      };
      const result = controller.getProfile(req as AuthenticatedRequest);

      expect(result).toEqual(mockUser);
    });

    it('should return undefined if the user object is not in the request', () => {
      const req = {} as AuthenticatedRequest;

      const result = controller.getProfile(req);

      expect(result).toBeUndefined();
    });
  });

  describe('getHello', () => {
    it('should call AppService.getHello', () => {
      mockAppService.getHello.mockReturnValue('Hello World!');

      expect(controller.getHello()).toBe('Hello World!');
      expect(mockAppService.getHello).toHaveBeenCalled();
    });
  });
});
