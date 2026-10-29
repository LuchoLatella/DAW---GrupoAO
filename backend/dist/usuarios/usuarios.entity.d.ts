export declare enum EstadoUsuario {
    ACTIVO = "ACTIVO",
    BAJA = "BAJA"
}
export declare enum RolUsuario {
    MEDICO = "MEDICO",
    PACIENTE = "PACIENTE",
    ADMINISTRADOR = "ADMINISTRADOR"
}
export declare class Usuario {
    id: number;
    documento: string;
    apellidos: string;
    nombres: string;
    email: string;
    clave: string;
    estado: EstadoUsuario;
    rol: RolUsuario;
}
