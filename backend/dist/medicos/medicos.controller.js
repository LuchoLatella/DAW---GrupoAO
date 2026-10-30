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
exports.MedicosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medicos_service_1 = require("./medicos.service");
const update_valor_consulta_dto_1 = require("./dto/update-valor-consulta.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
let MedicosController = class MedicosController {
    constructor(medicosService) {
        this.medicosService = medicosService;
    }
    updateValorConsulta(id, updateValorConsultaDto) {
        return this.medicosService.updateValorConsulta(id, updateValorConsultaDto);
    }
};
exports.MedicosController = MedicosController;
__decorate([
    (0, common_1.Patch)(':id/valor-consulta'),
    (0, roles_decorator_1.Roles)(usuarios_entity_1.RolUsuario.ADMINISTRADOR),
    (0, swagger_1.ApiOperation)({ summary: 'Permite al Administrador modificar el valor de la consulta de un médico' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_valor_consulta_dto_1.UpdateValorConsultaDto]),
    __metadata("design:returntype", void 0)
], MedicosController.prototype, "updateValorConsulta", null);
exports.MedicosController = MedicosController = __decorate([
    (0, swagger_1.ApiTags)('Medicos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/medicos'),
    __metadata("design:paramtypes", [medicos_service_1.MedicosService])
], MedicosController);
//# sourceMappingURL=medicos.controller.js.map