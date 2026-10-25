import { Proyecto } from '../proyectos/proyectos.entity';
export declare enum EstadoTarea {
    PENDIENTE = "PENDIENTE",
    FINALIZADA = "FINALIZADA",
    BAJA = "BAJA"
}
export declare class Tarea {
    id: number;
    descripcion: string;
    estado: EstadoTarea;
    id_proyecto: number;
    proyecto: Proyecto;
}
