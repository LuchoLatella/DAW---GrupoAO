import { Proyecto } from '../proyectos/proyectos.entity';
export declare enum EstadoCliente {
    ACTIVO = "ACTIVO",
    BAJA = "BAJA"
}
export declare class Cliente {
    id: number;
    nombre: string;
    estado: EstadoCliente;
    proyectos: Proyecto[];
}
