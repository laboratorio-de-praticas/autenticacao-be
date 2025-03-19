import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class ValidateLoginUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;
}
