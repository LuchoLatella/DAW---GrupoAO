import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reserva, EstadoReserva } from './reservas.entity';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepository: Repository<Reserva>,
  ) {}

  // Regla Médico: Ver sus turnos reservados dada una fecha
  async findByMedicoYFecha(id_medico: number, fechaStr: string): Promise<Reserva[]> {
    const inicioDia = new Date(`${fechaStr}T00:00:00`);
    const finDia = new Date(`${fechaStr}T23:59:59`);

    return await this.reservasRepository.find({
      where: {
        id_medico,
        fecha_hora: Between(inicioDia, finDia),
      },
      relations: ['paciente'],
      order: { fecha_hora: 'ASC' },
    });
  }

  // Regla Médico: Marcar turno como ATENDIDO o AUSENTE
  async updateEstado(id: number, updateDto: UpdateEstadoReservaDto): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (
      updateDto.estado !== EstadoReserva.ATENDIDO &&
      updateDto.estado !== EstadoReserva.AUSENTE
    ) {

      throw new BadRequestException('Desde este endpoint solo se puede marcar como ATENDIDO o AUSENTE');
    }

    reserva.estado = updateDto.estado;
    return await this.reservasRepository.save(reserva);
  }
}