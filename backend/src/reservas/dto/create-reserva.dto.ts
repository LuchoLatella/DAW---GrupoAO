
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, Min } from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({
    example: 1,
    description: 'ID del médico',
  })
  @IsInt()
  @Min(1)
  id_medico!: number;

  @ApiProperty({
    example: '2026-11-05T09:00:00',
    description: 'Fecha y hora del turno',
  })
  @IsISO8601({ strict: true })
  fecha_hora!: string;
}
