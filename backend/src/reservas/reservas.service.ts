import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Usuario, RolUsuario, EstadoUsuario } from '../usuarios/usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { Reserva, EstadoReserva } from './reservas.entity';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';
import { Medico } from '../medicos/medicos.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepository: Repository<Reserva>,

    @InjectRepository(Medico)
    private readonly medicosRepository: Repository<Medico>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findByMedicoYFecha(
    id_medico: number,
    fechaStr: string,
  ): Promise<Reserva[]> {
    const inicioDia = new Date(`${fechaStr}T00:00:00`);
    const finDia = new Date(`${fechaStr}T23:59:59`);

    return await this.reservasRepository.find({
      where: {
        id_medico,
        fecha_hora: Between(inicioDia, finDia),
      },
      relations: {
        paciente: true,
      },
      order: {
        fecha_hora: 'ASC',
      },
    });
  }

  async updateEstado(
    id: number,
    updateDto: UpdateEstadoReservaDto,
  ): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({
      where: { id },
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (
      updateDto.estado !== EstadoReserva.ATENDIDO &&
      updateDto.estado !== EstadoReserva.AUSENTE
    ) {
      throw new BadRequestException(
        'Desde este endpoint solo se puede marcar como ATENDIDO o AUSENTE',
      );
    }

    reserva.estado = updateDto.estado;

    return await this.reservasRepository.save(reserva);
  }

  async getDisponibles(
    id_medico: number,
    fecha: string,
  ): Promise<string[]> {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(fecha) ||
      Number.isNaN(new Date(`${fecha}T00:00:00`).getTime()) ||
      new Date(`${fecha}T00:00:00`).toLocaleDateString('en-CA') !== fecha
    ) {
      throw new BadRequestException('Fecha inválida');
    }

    const horarios = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
    ];

    const ahora = new Date();

    const fechaMaxima = new Date(ahora);
    fechaMaxima.setDate(fechaMaxima.getDate() + 30);
    fechaMaxima.setHours(23, 59, 59, 999);

    const fechaSeleccionada = new Date(`${fecha}T00:00:00`);

    if (fechaSeleccionada > fechaMaxima) {
      return [];
    }

    const reservas = await this.findByMedicoYFecha(id_medico, fecha);

    const ocupados = reservas
      .filter((reserva) => reserva.estado !== EstadoReserva.CANCELADO)
      .map((reserva) => {
        const hora = reserva.fecha_hora.getHours();
        return `${hora.toString().padStart(2, '0')}:00`;
      });

    return horarios.filter((horario) => {
      const fechaHora = new Date(`${fecha}T${horario}:00`);
      const estaOcupado = ocupados.includes(horario);
      const yaPaso = fechaHora <= ahora;

      return !estaOcupado && !yaPaso;
    });
  }

  private validarFechaHora(fechaHora: Date): void {
    const ahora = new Date();

    if (Number.isNaN(fechaHora.getTime())) {
      throw new BadRequestException('Fecha y hora inválidas');
    }

    if (fechaHora <= ahora) {
      throw new BadRequestException(
        'No se pueden reservar turnos que ya han pasado',
      );
    }

    const fechaMaxima = new Date(ahora);
    fechaMaxima.setDate(fechaMaxima.getDate() + 30);

    if (fechaHora > fechaMaxima) {
      throw new BadRequestException(
        'Solo se pueden reservar turnos con hasta 30 días de anticipación',
      );
    }

    const hora = fechaHora.getHours();

    if (
      hora < 8 ||
      hora >= 16 ||
      fechaHora.getMinutes() !== 0 ||
      fechaHora.getSeconds() !== 0 ||
      fechaHora.getMilliseconds() !== 0
    ) {
      throw new BadRequestException(
        'Los turnos deben comenzar en horas exactas entre las 08:00 y las 15:00',
      );
    }
  }

  async crearReserva(
    dto: CreateReservaDto,
    idPaciente: number,
  ): Promise<Reserva> {
    const paciente = await this.usuariosRepository.findOne({
      where: { id: idPaciente },
    });

    if (!paciente) {
      throw new NotFoundException('El paciente no existe');
    }

    if (paciente.rol !== RolUsuario.PACIENTE) {
      throw new BadRequestException(
        'El usuario seleccionado no es un paciente',
      );
    }
    if (paciente.estado !== EstadoUsuario.ACTIVO) {
      throw new BadRequestException('El paciente no está activo');
    }

    const fechaHora = new Date(dto.fecha_hora);

    this.validarFechaHora(fechaHora);

    const medico = await this.medicosRepository.findOne({
      where: { id: dto.id_medico },
    });

    if (!medico) {
      throw new NotFoundException('El médico no existe');
    }

    // Buscamos si ya existe una reserva activa (RESERVADO) en esa fecha u hora
    const reservaExistente = await this.reservasRepository.findOne({
      where: {
        id_medico: dto.id_medico,
        fecha_hora: fechaHora,
        estado: EstadoReserva.RESERVADO, // 👈 Alineado con PostgreSQL
      },
    });

    if (reservaExistente) {
      throw new BadRequestException(
        'El médico ya tiene un turno reservado en ese horario',
      );
    }

    const reserva = this.reservasRepository.create({
      id_medico: dto.id_medico,
      id_paciente: idPaciente,
      fecha_hora: fechaHora,
      estado: EstadoReserva.RESERVADO, //  Alineado con PostgreSQL
      monto_consulta: medico.valor_consulta, //  Congela tarifa en monto_consulta
    });

    return await this.reservasRepository.save(reserva);
  }

  async misReservas(idPaciente: number): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      where: { id_paciente: idPaciente },
      relations: { medico: true },
      order: { fecha_hora: 'ASC' },
    });
  }

  async cancelarReserva(
    id: number,
    idUsuario: number,
    rol: string,
  ): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({
      where: { id },
    });

    if (!reserva) {
      throw new NotFoundException('La reserva no existe');
    }

    if (rol === 'PACIENTE' && reserva.id_paciente !== idUsuario) {
      throw new ForbiddenException(
        'No podés cancelar reservas de otro paciente',
      );
    }

    if (reserva.estado !== EstadoReserva.RESERVADO) { // 👈 Alineado con PostgreSQL
      throw new BadRequestException('La reserva no está activa');
    }

    const ahora = new Date();
    const fechaTurno = new Date(reserva.fecha_hora);

    if (rol === 'PACIENTE') {
      const inicioDiaTurno = new Date(fechaTurno);
      inicioDiaTurno.setHours(0, 0, 0, 0);

      if (ahora >= inicioDiaTurno) {
        throw new BadRequestException(
          'Solo se puede cancelar hasta el día anterior al turno',
        );
      }
    } else if (rol === 'ADMINISTRADOR') {
      if (ahora >= fechaTurno) {
        throw new BadRequestException(
          'El turno ya comenzó y no puede cancelarse',
        );
      }
    } else {
      throw new ForbiddenException(
        'No tenés permisos para cancelar reservas',
      );
    }

    reserva.estado = EstadoReserva.CANCELADO;

    return await this.reservasRepository.save(reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      relations: {
        paciente: true,
        medico: true,
      },
      order: {
        fecha_hora: 'ASC',
      },
    });
  }
}