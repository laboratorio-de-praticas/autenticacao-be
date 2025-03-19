import { IsEmail, IsNumber } from 'class-validator';

export class UserProfileDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
}
