import { IsEmail, IsNumber } from 'class-validator';

export class UserProfileResponseDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
}
