import { Controller, Get, Patch, Param, Query, Body, UseGuards, ParseIntPipe, Request, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { MedicosService } from '../medicos/medicos.service';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/usuarios.entity';

@ApiTags('Reservas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/reservas')
export class ReservasController {
  constructor(
    private readonly reservasService: ReservasService,
    private readonly medicosService: MedicosService,
  ) {}

  @Get('mis-turnos')
  @Roles(RolUsuario.MEDICO)
  @ApiOperation({ summary: 'Permite al médico ver sus turnos reservados para una fecha (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fecha', example: '2026-10-30', description: 'Fecha en formato YYYY-MM-DD' })
  async getMisTurnos(@Request() req: any, @Query('fecha') fecha: string) {
    if (!fecha) {
      throw new BadRequestException('Debe proporcionar el parámetro fecha');
    }
    // Obtener el ID de médico correspondiente al usuario autenticado
    const medico = await this.medicosService.findByUsuarioId(req.user.userId);
    return this.reservasService.findByMedicoYFecha(medico.id, fecha);
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
}