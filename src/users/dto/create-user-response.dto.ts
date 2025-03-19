import { IsNumber, IsString } from 'class-validator';

export class CreateUserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;
}
