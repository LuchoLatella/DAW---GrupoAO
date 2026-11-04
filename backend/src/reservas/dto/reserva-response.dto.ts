import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../reservas.entity';

export class PacienteResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juan' })
  nombres!: string;

  @ApiProperty({ example: 'Pérez' })
  apellidos!: string;
}

export class MedicoReservaResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Cardiología', required: false })
  especialidad?: string;
}

export class ReservaResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '2026-11-10T10:00:00.000Z' })
  fecha_hora!: Date;

  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.RESERVADO })
  estado!: EstadoReserva;

  @ApiProperty({ example: 15000, description: 'Monto congelado de la consulta' })
  monto_consulta!: number;

  @ApiProperty({ type: PacienteResponseDto, nullable: true })
  paciente!: PacienteResponseDto | null;

  @ApiProperty({ type: MedicoReservaResponseDto, nullable: true })
  medico!: MedicoReservaResponseDto | null;
}