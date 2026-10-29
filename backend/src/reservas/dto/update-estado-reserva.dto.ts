import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoReserva } from '../reservas.entity';

export class UpdateEstadoReservaDto {
  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ATENDIDO })
  @IsEnum(EstadoReserva)
  @IsNotEmpty()
  estado!: EstadoReserva;
}