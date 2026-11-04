
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RolUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  MEDICO = 'MEDICO',
  PACIENTE = 'PACIENTE',
}

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', unique: true })
  documento!: string;

  @Column({ type: 'text' })
  nombres!: string;

  @Column({ type: 'text' })
  apellidos!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  clave!: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    enumName: 'roles_usuarios',
  })
  rol!: RolUsuario;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    enumName: 'estados_usuarios',
    default: EstadoUsuario.ACTIVO,
  })
  estado!: EstadoUsuario;
}
