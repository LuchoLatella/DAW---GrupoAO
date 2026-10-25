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
exports.Tarea = exports.EstadoTarea = void 0;
const typeorm_1 = require("typeorm");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
var EstadoTarea;
(function (EstadoTarea) {
    EstadoTarea["PENDIENTE"] = "PENDIENTE";
    EstadoTarea["FINALIZADA"] = "FINALIZADA";
    EstadoTarea["BAJA"] = "BAJA";
})(EstadoTarea || (exports.EstadoTarea = EstadoTarea = {}));
let Tarea = class Tarea {
};
exports.Tarea = Tarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tarea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Tarea.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoTarea,
    }),
    __metadata("design:type", String)
], Tarea.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_proyecto' }),
    __metadata("design:type", Number)
], Tarea.prototype, "id_proyecto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyectos_entity_1.Proyecto, (proyecto) => proyecto.tareas),
    (0, typeorm_1.JoinColumn)({ name: 'id_proyecto' }),
    __metadata("design:type", proyectos_entity_1.Proyecto)
], Tarea.prototype, "proyecto", void 0);
exports.Tarea = Tarea = __decorate([
    (0, typeorm_1.Entity)('tareas')
], Tarea);
//# sourceMappingURL=tareas.entity.js.map