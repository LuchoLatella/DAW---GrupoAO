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
exports.ReservasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reservas_service_1 = require("./reservas.service");
const medicos_service_1 = require("../medicos/medicos.service");
const update_estado_reserva_dto_1 = require("./dto/update-estado-reserva.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
let ReservasController = class ReservasController {
    constructor(reservasService, medicosService) {
        this.reservasService = reservasService;
        this.medicosService = medicosService;
    }
    async getMisTurnos(req, fecha) {
        if (!fecha) {
            throw new common_1.BadRequestException('Debe proporcionar el parámetro fecha');
        }
        const medico = await this.medicosService.findByUsuarioId(req.user.userId);
        return this.reservasService.findByMedicoYFecha(medico.id, fecha);
    }
    updateEstado(id, updateEstadoDto) {
        return this.reservasService.updateEstado(id, updateEstadoDto);
    }
};
exports.ReservasController = ReservasController;
__decorate([
    (0, common_1.Get)('mis-turnos'),
    (0, roles_decorator_1.Roles)(usuarios_entity_1.RolUsuario.MEDICO),
    (0, swagger_1.ApiOperation)({ summary: 'Permite al médico ver sus turnos reservados para una fecha (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'fecha', example: '2026-10-30', description: 'Fecha en formato YYYY-MM-DD' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservasController.prototype, "getMisTurnos", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    (0, roles_decorator_1.Roles)(usuarios_entity_1.RolUsuario.MEDICO),
    (0, swagger_1.ApiOperation)({ summary: 'Permite al médico marcar un turno como ATENDIDO o AUSENTE' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_estado_reserva_dto_1.UpdateEstadoReservaDto]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "updateEstado", null);
exports.ReservasController = ReservasController = __decorate([
    (0, swagger_1.ApiTags)('Reservas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/reservas'),
    __metadata("design:paramtypes", [reservas_service_1.ReservasService,
        medicos_service_1.MedicosService])
], ReservasController);
//# sourceMappingURL=reservas.controller.js.map