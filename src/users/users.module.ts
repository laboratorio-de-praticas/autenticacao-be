import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Visitor } from 'src/entities/external-user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExternalUsersController } from './controllers/external-users.controller';
import { ExternalUsersService } from './services/external-users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Visitor]),
  ],
  controllers: [UsersController, ExternalUsersController],
  providers: [
    UsersService,
    ExternalUsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UsersService, ExternalUsersService],
})
export class UsersModule {}
