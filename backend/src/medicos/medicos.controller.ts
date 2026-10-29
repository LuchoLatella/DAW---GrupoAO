import { Controller, Patch, Param, Body, UseGuards, ParseIntPipe, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MedicosService } from './medicos.service';
import { UpdateValorConsultaDto } from './dto/update-valor-consulta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/usuarios.entity';

@ApiTags('Medicos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Patch(':id/valor-consulta')
  @Roles(RolUsuario.ADMINISTRADOR)
  @ApiOperation({ summary: 'Permite al Administrador modificar el valor de la consulta de un médico' })
  updateValorConsulta(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateValorConsultaDto: UpdateValorConsultaDto,
  ) {
    return this.medicosService.updateValorConsulta(id, updateValorConsultaDto);
  }
}