import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginResponseDto {
  @ApiProperty({
    description: 'Token de acesso que será utilizado em outras rotas',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYWxAbGVhbC5jb20iLCJpZCI6MSwiaWF0IjoxNzQyNDA2NzE0LCJleHAiOjE3NDI0MTAzMTR9.YQq5lZqzHExWPluyxyyMQdRtMyWzBT3p03_ibzuJkQ0',
  })
  @IsString()
  access_token: string;
}
