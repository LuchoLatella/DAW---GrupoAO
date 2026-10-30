"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservas_entity_1 = require("./reservas.entity");
let ReservasService = class ReservasService {
    constructor(reservasRepository) {
        this.reservasRepository = reservasRepository;
    }
    async findByMedicoYFecha(id_medico, fechaStr) {
        const inicioDia = new Date(`${fechaStr}T00:00:00`);
        const finDia = new Date(`${fechaStr}T23:59:59`);
        return await this.reservasRepository.find({
            where: {
                id_medico,
                fecha_hora: (0, typeorm_2.Between)(inicioDia, finDia),
            },
            relations: { paciente: true },
            order: { fecha_hora: 'ASC' },
        });
    }
    async updateEstado(id, updateDto) {
        const reserva = await this.reservasRepository.findOne({ where: { id } });
        if (!reserva) {
            throw new common_1.NotFoundException(`Reserva con ID ${id} no encontrada`);
        }
        if (updateDto.estado !== reservas_entity_1.EstadoReserva.ATENDIDO &&
            updateDto.estado !== reservas_entity_1.EstadoReserva.AUSENTE) {
            throw new common_1.BadRequestException('Desde este endpoint solo se puede marcar como ATENDIDO o AUSENTE');
        }
        reserva.estado = updateDto.estado;
        return await this.reservasRepository.save(reserva);
    }
};
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservas_entity_1.Reserva)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map