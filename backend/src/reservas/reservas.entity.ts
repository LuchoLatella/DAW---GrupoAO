import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Medico } from '../medicos/medicos.entity';

export enum EstadoReserva {
  RESERVADO = 'RESERVADO',
  ATENDIDO = 'ATENDIDO',
  CANCELADO = 'CANCELADO',
  AUSENTE = 'AUSENTE',
}

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  id_medico!: number;

  @Column({ type: 'int' })
  id_paciente!: number;

  @Column({ type: 'timestamp' })
  fecha_hora!: Date;

  @Column({ type: 'int', name: 'monto_consulta' })
  monto_consulta!: number;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.RESERVADO,
  })
  estado!: EstadoReserva;

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Usuario;

  @ManyToOne(() => Medico, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_medico' })
  medico!: Medico;
}