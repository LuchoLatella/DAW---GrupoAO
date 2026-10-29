import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_usuario' })
  id_usuario!: number;

  @Column({ type: 'int' })
  matricula!: number;

  @Column({ type: 'int' })
  valor_consulta!: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}