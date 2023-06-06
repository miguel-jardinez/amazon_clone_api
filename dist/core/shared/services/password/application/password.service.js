"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const password_exception_service_1 = require("../utils/password-exception.service");
let PasswordService = class PasswordService {
    constructor() {
        this.logger = new common_1.Logger(password_exception_service_1.PasswordException.name);
    }
    async hashPassword(password) {
        try {
            return await (0, argon2_1.hash)(password);
        }
        catch (e) {
            this.logger.log(`Password not hashed :: ${new Date()}`);
            (0, password_exception_service_1.PasswordException)(e);
        }
    }
    async verifyPassword(hashedPassword, password) {
        try {
            return await (0, argon2_1.verify)(hashedPassword, password);
        }
        catch (e) {
            this.logger.log(`Password not verified :: ${new Date()}`);
            (0, password_exception_service_1.PasswordException)(e);
        }
    }
};
PasswordService = __decorate([
    (0, common_1.Injectable)()
], PasswordService);
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map