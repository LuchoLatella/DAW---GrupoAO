import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';

export enum EstadoCliente {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', unique: true })
  nombre!: string;

  @Column({
    type: 'enum',
    enum: EstadoCliente,
  })
  estado!: EstadoCliente;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
  proyectos!: Proyecto[];
}