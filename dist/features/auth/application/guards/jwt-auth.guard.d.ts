import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../../../../core/env/env.service';
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private readonly envConfig;
    private reflector;
    constructor(jwtService: JwtService, envConfig: EnvConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
