import { Cliente } from '../clientes/clientes.entity';
import { Tarea } from '../tareas/tareas.entity';
export declare enum EstadoProyecto {
    ACTIVO = "ACTIVO",
    FINALIZADO = "FINALIZADO",
    BAJA = "BAJA"
}
export declare class Proyecto {
    id: number;
    nombre: string;
    estado: EstadoProyecto;
    id_cliente: number;
    cliente: Cliente;
    tareas: Tarea[];
}
