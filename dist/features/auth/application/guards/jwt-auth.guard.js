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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const env_service_1 = require("../../../../core/env/env.service");
const IsPublic_1 = require("../decorators/IsPublic");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, envConfig, reflector) {
        this.jwtService = jwtService;
        this.envConfig = envConfig;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(IsPublic_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.envConfig.configJwt().secret,
            });
            request['user_id'] = payload.user_id;
            request['profile_id'] = payload.profile_id;
        }
        catch (_a) {
            throw new common_1.HttpException('', common_1.HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        env_service_1.EnvConfigService,
        core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map