import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '11111111' })
  @IsString()
  @IsNotEmpty()
  documento!: string;

  @ApiProperty({ example: 'clave123' })
  @IsString()
  @IsNotEmpty()
  clave!: string;
}