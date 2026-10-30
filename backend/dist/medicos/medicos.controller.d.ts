import { MedicosService } from './medicos.service';
import { UpdateValorConsultaDto } from './dto/update-valor-consulta.dto';
export declare class MedicosController {
    private readonly medicosService;
    constructor(medicosService: MedicosService);
    updateValorConsulta(id: number, updateValorConsultaDto: UpdateValorConsultaDto): Promise<import("./medicos.entity").Medico>;
}
