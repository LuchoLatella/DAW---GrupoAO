import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';

export enum EstadoTarea {
  PENDIENTE = 'PENDIENTE',
  FINALIZADA = 'FINALIZADA',
  BAJA = 'BAJA',
}

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: EstadoTarea,
  })
  estado!: EstadoTarea;

  @Column({ name: 'id_proyecto' })
  id_proyecto!: number;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto!: Proyecto;
}