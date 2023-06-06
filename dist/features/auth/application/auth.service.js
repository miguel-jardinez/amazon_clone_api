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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/application/user.service");
const auth_exception_service_1 = require("../utils/auth-exception.service");
const login_response_dto_1 = require("./models/login-response.dto");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(user) {
        try {
            const token = this.jwtService.sign({
                user_id: user.id,
                profile_id: user.profile.id,
            });
            return new login_response_dto_1.LoginResponseDto(token);
        }
        catch (e) {
            this.logger.error(`Error to login ${user.email} :: ${new Date()}`);
            throw new auth_exception_service_1.AuthExceptionService(e.message, common_1.HttpStatus.CONFLICT);
        }
    }
    async register(register) {
        try {
            const data = await this.userService.createUser(register);
            this.logger.log(`User ${register.email} successfully registered :: ${new Date()}`);
            const token = this.jwtService.sign({
                user_id: data.id,
                profile_id: data.profile.id,
            });
            return new login_response_dto_1.LoginResponseDto(token);
        }
        catch (e) {
            this.logger.error(`Error to register ${register.email} :: ${new Date()}`);
            throw new auth_exception_service_1.AuthExceptionService(e.message, common_1.HttpStatus.CONFLICT);
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map