import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', unique: true })
  id_usuario!: number;

  @Column({ type: 'varchar', length: 100 })
  especialidad!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  matricula!: string;

  @Column({ type: 'int' })
  valor_consulta!: number;

  @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}