import {IsString } from 'class-validator';

export class LoginUserResponseDto {
  @IsString()
  access_token: string;
}
