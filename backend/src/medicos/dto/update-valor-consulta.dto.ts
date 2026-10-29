import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateValorConsultaDto {
  @ApiProperty({ example: 20000, description: 'Nuevo valor de la consulta médica' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  valor_consulta!: number;
}