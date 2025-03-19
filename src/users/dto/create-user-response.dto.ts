import { IsNumber, IsString } from 'class-validator';

export class CreateUserResponseDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly message: string;
}
