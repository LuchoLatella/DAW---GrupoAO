import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const { documento, clave } = loginDto;

      // 1. Buscar usuario por documento
      const usuario = await this.usuariosRepository.findOne({ where: { documento } });

      if (!usuario) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // 2. Regla de negocio: Validar estado ACTIVO
      if (usuario.estado !== EstadoUsuario.ACTIVO) {
        throw new UnauthorizedException('El usuario se encuentra dado de baja');
      }

      // 3. Validar contraseña (intenta comparación directa primero, y si no, bcrypt)
      let esClaveValida = usuario.clave === clave;

      if (!esClaveValida && usuario.clave) {
        try {
          esClaveValida = await bcrypt.compare(clave, usuario.clave);
        } catch (error) {
          console.error('Error al comparar contraseña con bcrypt:', error);
          esClaveValida = false;
        }
      }

      if (!esClaveValida) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // 4. Generar token JWT con el payload exigido por la cátedra
      const payload = { 
        sub: usuario.id, 
        documento: usuario.documento, 
        rol: usuario.rol 
      };

      return {
        access_token: this.jwtService.sign(payload),
        usuario: {
          id: usuario.id,
          documento: usuario.documento,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          rol: usuario.rol,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('--- ERROR DETALLADO EN AUTH SERVICE ---', error);
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Error interno al autenticar',
      );
    }
  }
}