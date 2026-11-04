import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { MedicosService } from '../medicos/medicos.service';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/usuarios.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@ApiTags('Reservas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/reservas')
export class ReservasController {
  constructor(
    private readonly reservasService: ReservasService,
    private readonly medicosService: MedicosService,
  ) {}

  @Get()
  @Roles(RolUsuario.ADMINISTRADOR)
  @ApiOperation({ summary: 'Listar todas las reservas del sistema' })
  async listarReservas() {
    const reservas = await this.reservasService.findAll();

    return reservas.map((reserva) => ({
      id: reserva.id,
      fecha_hora: reserva.fecha_hora,
      estado: reserva.estado,
      monto_consulta: reserva.monto_consulta, // 👈 Mapeado correctamente desde PostgreSQL
      paciente: reserva.paciente
        ? {
            id: reserva.paciente.id,
            nombres: reserva.paciente.nombres,
            apellidos: reserva.paciente.apellidos,
          }
        : null,
      medico: reserva.medico
        ? {
            id: reserva.medico.id,
            especialidad: reserva.medico.especialidad,
          }
        : null,
    }));
  }

  @Get('mis-turnos')
  @Roles(RolUsuario.MEDICO)
  @ApiOperation({ summary: 'Permite al médico ver sus turnos reservados para una fecha (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fecha', example: '2026-10-30', description: 'Fecha en formato YYYY-MM-DD' })
  async getMisTurnos(@Request() req: any, @Query('fecha') fecha: string) {
    if (!fecha) {
      throw new BadRequestException('Debe proporcionar el parámetro fecha');
    }
    const medico = await this.medicosService.findByUsuarioId(req.user.userId);
    return this.reservasService.findByMedicoYFecha(medico.id, fecha);
  }

  @Get('disponibles')
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @ApiOperation({ summary: 'Consultar horarios disponibles de un médico' })
  @ApiQuery({ name: 'id_medico', type: Number, example: 1 })
  @ApiQuery({ name: 'fecha', type: String, example: '2026-11-05' })
  async getDisponibles(
    @Query('id_medico', ParseIntPipe) id_medico: number,
    @Query('fecha') fecha: string,
  ) {
    if (!fecha) {
      throw new BadRequestException('Debe proporcionar una fecha');
    }

    return this.reservasService.getDisponibles(id_medico, fecha);
  }

  @Patch(':id/estado')
  @Roles(RolUsuario.MEDICO)
  @ApiOperation({ summary: 'Permite al médico marcar un turno como ATENDIDO o AUSENTE' })
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoDto: UpdateEstadoReservaDto,
  ) {
    return this.reservasService.updateEstado(id, updateEstadoDto);
  }

  @Post()
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @ApiOperation({ summary: 'Crear una reserva' })
  crearReserva(
    @Body() dto: CreateReservaDto,
    @Request() req: any,
  ) {
    let idPaciente = req.user.userId;

    if (req.user.rol === RolUsuario.ADMINISTRADOR) {
      if (!dto.id_paciente) {
        throw new BadRequestException('Debe indicar el ID del paciente');
      }

      idPaciente = dto.id_paciente;
    }

    return this.reservasService.crearReserva(dto, idPaciente);
  }

  @Get('mis-reservas')
  @Roles(RolUsuario.PACIENTE)
  @ApiOperation({ summary: 'Ver mis reservas' })
  misReservas(@Request() req: any) {
    return this.reservasService.misReservas(req.user.userId);
  }

  @Patch(':id/cancelar')
  @Roles(RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR)
  @ApiOperation({ summary: 'Cancelar una reserva' })
  cancelarReserva(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.reservasService.cancelarReserva(
      id,
      req.user.userId,
      req.user.rol,
    );
  }
}