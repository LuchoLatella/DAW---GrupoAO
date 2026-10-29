import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: number;
            documento: string;
            nombres: string;
            apellidos: string;
            rol: import("../usuarios/usuarios.entity").RolUsuario;
        };
    }>;
}
