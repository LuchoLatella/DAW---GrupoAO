import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usuariosRepository;
    private readonly jwtService;
    constructor(usuariosRepository: Repository<Usuario>, jwtService: JwtService);
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
