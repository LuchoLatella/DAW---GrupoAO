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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = exports.EstadoReserva = void 0;
const typeorm_1 = require("typeorm");
const medicos_entity_1 = require("../medicos/medicos.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
var EstadoReserva;
(function (EstadoReserva) {
    EstadoReserva["ACTIVO"] = "ACTIVO";
    EstadoReserva["ATENDIDO"] = "ATENDIDO";
    EstadoReserva["AUSENTE"] = "AUSENTE";
    EstadoReserva["CANCELADO"] = "CANCELADO";
})(EstadoReserva || (exports.EstadoReserva = EstadoReserva = {}));
let Reserva = class Reserva {
};
exports.Reserva = Reserva;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reserva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_medico' }),
    __metadata("design:type", Number)
], Reserva.prototype, "id_medico", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_paciente' }),
    __metadata("design:type", Number)
], Reserva.prototype, "id_paciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reserva.prototype, "fecha_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoReserva }),
    __metadata("design:type", String)
], Reserva.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reserva.prototype, "valor_consulta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medicos_entity_1.Medico),
    (0, typeorm_1.JoinColumn)({ name: 'id_medico' }),
    __metadata("design:type", medicos_entity_1.Medico)
], Reserva.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarios_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_paciente' }),
    __metadata("design:type", usuarios_entity_1.Usuario)
], Reserva.prototype, "paciente", void 0);
exports.Reserva = Reserva = __decorate([
    (0, typeorm_1.Entity)('reservas')
], Reserva);
//# sourceMappingURL=reservas.entity.js.map