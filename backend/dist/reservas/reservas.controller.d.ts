import { ReservasService } from './reservas.service';
import { MedicosService } from '../medicos/medicos.service';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    private readonly medicosService;
    constructor(reservasService: ReservasService, medicosService: MedicosService);
    getMisTurnos(req: any, fecha: string): Promise<import("./reservas.entity").Reserva[]>;
    updateEstado(id: number, updateEstadoDto: UpdateEstadoReservaDto): Promise<import("./reservas.entity").Reserva>;
}
