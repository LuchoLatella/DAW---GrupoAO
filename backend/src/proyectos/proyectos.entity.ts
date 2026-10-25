import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Tarea } from '../tareas/tareas.entity';

export enum EstadoProyecto {
  ACTIVO = 'ACTIVO',
  FINALIZADO = 'FINALIZADO',
  BAJA = 'BAJA',
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @Column({
    type: 'enum',
    enum: EstadoProyecto,
  })
  estado: EstadoProyecto;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];
}