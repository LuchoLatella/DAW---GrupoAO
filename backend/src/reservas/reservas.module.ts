
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './reservas.entity';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { MedicosModule } from '../medicos/medicos.module';
import { Medico } from '../medicos/medicos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Medico]),
    MedicosModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
