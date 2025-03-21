import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserLoginRequestDto } from '../dto/user-login-request.dto';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userLoginRequestDto = plainToInstance(
      UserLoginRequestDto,
      request.body,
    );
    const errors = await validate(userLoginRequestDto);
    if (errors.length > 0) {
      const formattedErrors = errors.map((err) =>
        Object.values(err.constraints).join(' '),
      );

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: formattedErrors,
      });
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
