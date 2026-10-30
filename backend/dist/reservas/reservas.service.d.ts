import { Repository } from 'typeorm';
import { Reserva } from './reservas.entity';
import { UpdateEstadoReservaDto } from './dto/update-estado-reserva.dto';
export declare class ReservasService {
    private readonly reservasRepository;
    constructor(reservasRepository: Repository<Reserva>);
    findByMedicoYFecha(id_medico: number, fechaStr: string): Promise<Reserva[]>;
    updateEstado(id: number, updateDto: UpdateEstadoReservaDto): Promise<Reserva>;
}
