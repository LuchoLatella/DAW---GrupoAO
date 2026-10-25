import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, EstadoUsuario } from '../usuarios/usuarios.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { nombre, clave } = loginDto;

    // 1. Buscar usuario por nombre
    const usuario = await this.usuariosRepository.findOne({ where: { nombre } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Regla de negocio: Validar estado ACTIVO
    if (usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new UnauthorizedException('El usuario se encuentra dado de baja');
    }

    // 3. Validar contraseña con bcrypt (compatible con pgcrypto)[cite: 3]
    const esClaveValida = await bcrypt.compare(clave, usuario.clave);
    if (!esClaveValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Generar token JWT
    const payload = { sub: usuario.id, nombre: usuario.nombre };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
      },
    };
  }
}