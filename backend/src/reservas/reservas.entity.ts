
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Usuario } from '../usuarios/usuarios.entity';
import { Medico } from '../medicos/medicos.entity';

export enum EstadoReserva {
  ACTIVO = 'ACTIVO',
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

  @Column({
    name: 'valor_consulta',
    type: 'int',
  })
  monto_consulta!: number;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    enumName: 'estados_reservas',
    default: EstadoReserva.ACTIVO,
  })
  estado!: EstadoReserva;

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Usuario;

  @ManyToOne(() => Medico, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_medico' })
  medico!: Medico;
}
