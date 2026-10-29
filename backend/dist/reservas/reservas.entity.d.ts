import { Medico } from '../medicos/medicos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
export declare enum EstadoReserva {
    ACTIVO = "ACTIVO",
    ATENDIDO = "ATENDIDO",
    AUSENTE = "AUSENTE",
    CANCELADO = "CANCELADO"
}
export declare class Reserva {
    id: number;
    id_medico: number;
    id_paciente: number;
    fecha_hora: Date;
    estado: EstadoReserva;
    valor_consulta: number;
    medico: Medico;
    paciente: Usuario;
}
