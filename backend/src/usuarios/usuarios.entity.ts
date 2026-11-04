import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RolUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  MEDICO = 'MEDICO',
  PACIENTE = 'PACIENTE',
}

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  documento!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos!: string;

  @Column({ type: 'varchar', length: 255 })
  clave!: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    enumName: 'rol_usuario_enum',
  })
  rol!: RolUsuario;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    enumName: 'estado_usuario_enum',
    default: EstadoUsuario.ACTIVO,
  })
  estado!: EstadoUsuario;
}