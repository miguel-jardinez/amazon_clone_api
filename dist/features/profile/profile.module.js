"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_entity_1 = require("./application/entities/profile.entity");
const profile_service_1 = require("./application/profile.service");
const profile_controller_1 = require("./infrestructure/profile.controller");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([profile_entity_1.ProfileEntity])],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
        exports: [profile_service_1.ProfileService],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map