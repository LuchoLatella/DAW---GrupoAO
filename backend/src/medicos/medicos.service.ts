import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medicos.entity';
import { UpdateValorConsultaDto } from './dto/update-valor-consulta.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicosRepository: Repository<Medico>,
  ) {}

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicosRepository.findOne({
      where: { id },
      relations: { usuario: true }, // Formato objeto para evitar error de TypeScript
    });
    if (!medico) {
      throw new NotFoundException(`Médico con ID ${id} no encontrado`);
    }
    return medico;
  }

  async findByUsuarioId(id_usuario: number): Promise<Medico> {
    const medico = await this.medicosRepository.findOne({ where: { id_usuario } });
    if (!medico) {
      throw new NotFoundException(`No se encontró perfil de médico para el usuario ${id_usuario}`);
    }
    return medico;
  }

  async updateValorConsulta(id: number, updateDto: UpdateValorConsultaDto): Promise<Medico> {
    const medico = await this.findOne(id);
    medico.valor_consulta = updateDto.valor_consulta;
    return await this.medicosRepository.save(medico);
  }
}