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
exports.MedicosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medicos_entity_1 = require("./medicos.entity");
let MedicosService = class MedicosService {
    constructor(medicosRepository) {
        this.medicosRepository = medicosRepository;
    }
    async findOne(id) {
        const medico = await this.medicosRepository.findOne({
            where: { id },
            relations: { usuario: true },
        });
        if (!medico) {
            throw new common_1.NotFoundException(`Médico con ID ${id} no encontrado`);
        }
        return medico;
    }
    async findByUsuarioId(id_usuario) {
        const medico = await this.medicosRepository.findOne({ where: { id_usuario } });
        if (!medico) {
            throw new common_1.NotFoundException(`No se encontró perfil de médico para el usuario ${id_usuario}`);
        }
        return medico;
    }
    async updateValorConsulta(id, updateDto) {
        const medico = await this.findOne(id);
        medico.valor_consulta = updateDto.valor_consulta;
        return await this.medicosRepository.save(medico);
    }
};
exports.MedicosService = MedicosService;
exports.MedicosService = MedicosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medicos_entity_1.Medico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicosService);
//# sourceMappingURL=medicos.service.js.map