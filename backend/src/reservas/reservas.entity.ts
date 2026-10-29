import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Medico } from '../medicos/medicos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

export enum EstadoReserva {
  ACTIVO = 'ACTIVO',
  ATENDIDO = 'ATENDIDO',
  AUSENTE = 'AUSENTE',
  CANCELADO = 'CANCELADO',
}

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_medico' })
  id_medico!: number;

  @Column({ name: 'id_paciente' })
  id_paciente!: number;

  @Column({ type: 'timestamp' })
  fecha_hora!: Date;

  @Column({ type: 'enum', enum: EstadoReserva })
  estado!: EstadoReserva;

  @Column({ type: 'int' })
  valor_consulta!: number;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'id_medico' })
  medico!: Medico;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Usuario;
}