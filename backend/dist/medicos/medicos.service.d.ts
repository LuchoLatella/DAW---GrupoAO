import { Repository } from 'typeorm';
import { Medico } from './medicos.entity';
import { UpdateValorConsultaDto } from './dto/update-valor-consulta.dto';
export declare class MedicosService {
    private readonly medicosRepository;
    constructor(medicosRepository: Repository<Medico>);
    findOne(id: number): Promise<Medico>;
    findByUsuarioId(id_usuario: number): Promise<Medico>;
    updateValorConsulta(id: number, updateDto: UpdateValorConsultaDto): Promise<Medico>;
}
