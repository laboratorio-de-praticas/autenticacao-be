import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

describe('AppController', () => {
  let controller: AppController;

  const mockAppService = {
    getHello: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUser = { id: 1, email: 'test@example.com', isActive: true };

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

      const req = { user: mockUser } as AuthenticatedRequest;
      const result = await controller.login(req);

      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toBe(mockLoginResponse);
    });

    it('should throw an error if AuthService.login fails', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));

      const req = { user: mockUser } as AuthenticatedRequest;

      await expect(controller.login(req)).rejects.toThrow('Login failed');
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getProfile', () => {
    it('should return the user object from the request', () => {
      const req = { user: mockUser } as AuthenticatedRequest;
      const result = controller.getProfile(req);

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
