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
exports.Proyecto = exports.EstadoProyecto = void 0;
const typeorm_1 = require("typeorm");
const clientes_entity_1 = require("../clientes/clientes.entity");
const tareas_entity_1 = require("../tareas/tareas.entity");
var EstadoProyecto;
(function (EstadoProyecto) {
    EstadoProyecto["ACTIVO"] = "ACTIVO";
    EstadoProyecto["FINALIZADO"] = "FINALIZADO";
    EstadoProyecto["BAJA"] = "BAJA";
})(EstadoProyecto || (exports.EstadoProyecto = EstadoProyecto = {}));
let Proyecto = class Proyecto {
};
exports.Proyecto = Proyecto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proyecto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoProyecto,
    }),
    __metadata("design:type", String)
], Proyecto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cliente' }),
    __metadata("design:type", Number)
], Proyecto.prototype, "id_cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clientes_entity_1.Cliente, (cliente) => cliente.proyectos),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", clientes_entity_1.Cliente)
], Proyecto.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tareas_entity_1.Tarea, (tarea) => tarea.proyecto),
    __metadata("design:type", Array)
], Proyecto.prototype, "tareas", void 0);
exports.Proyecto = Proyecto = __decorate([
    (0, typeorm_1.Entity)('proyectos')
], Proyecto);
//# sourceMappingURL=proyectos.entity.js.map