import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class UserProfileResponseDto {
  @ApiProperty({
    description: 'ID do usuário.',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'cks@cks.com',
  })
  @IsEmail()
  email: string;
}
