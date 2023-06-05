"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const env_service_1 = require("../../core/env/env.service");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./application/auth.service");
const jwt_auth_guard_1 = require("./application/guards/jwt-auth.guard");
const local_strategy_1 = require("./application/strategies/local.strategy");
const auth_controller_1 = require("./infrestucture/auth.controller");
let AuthModule = AuthModule_1 = class AuthModule {
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            AuthModule_1,
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: (configService) => {
                    return {
                        secret: configService.configJwt().secret,
                        signOptions: {
                            expiresIn: configService.configJwt().expiresIn,
                        },
                    };
                },
                inject: [env_service_1.EnvConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map