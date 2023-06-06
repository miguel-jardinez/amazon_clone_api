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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const password_service_1 = require("../../../core/shared/services/password/application/password.service");
const profile_service_1 = require("../../profile/application/profile.service");
const user_exception_service_1 = require("../utils/user-exception.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = UserService_1 = class UserService {
    constructor(userEntity, passwordService, profileService) {
        this.userEntity = userEntity;
        this.passwordService = passwordService;
        this.profileService = profileService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(user) {
        try {
            user.password = await this.passwordService.hashPassword(user.password);
            const userCreated = this.userEntity.create(user);
            this.logger.log(`${user.email} was created successfully :: ${new Date()}`);
            const userData = await this.userEntity.save(userCreated);
            const profile = await this.profileService.createProfile(userData.id, {});
            return Object.assign(Object.assign({}, userData), { profile });
        }
        catch (error) {
            (0, user_exception_service_1.UserException)(error, user.email, this.logger);
        }
    }
    async deleteUser(deleteUserDto) {
        try {
            const data = await this.userEntity.delete({ email: deleteUserDto.email });
            if (data.affected === 0) {
                this.logger.log(`Users ${deleteUserDto.email} not deleted :: ${new Date()}`);
                throw new common_1.HttpException(`User ${deleteUserDto.email} was not found and deleted :: ${new Date()}`, common_1.HttpStatus.NOT_FOUND);
            }
            this.logger.log(`Users ${deleteUserDto.email} deleted :: ${new Date()}`);
            return {
                message: `User ${deleteUserDto.email} was deleted`,
            };
        }
        catch (error) {
            (0, user_exception_service_1.UserException)(error, deleteUserDto.email, this.logger);
        }
    }
    async getById(id) {
        try {
            const data = await this.userEntity.findOneByOrFail({ id });
            this.logger.log(`Users ${data.email} found :: ${new Date()}`);
            return data;
        }
        catch (e) {
            (0, user_exception_service_1.UserException)(e, id, this.logger);
        }
    }
    async finAllUsers() {
        try {
            const data = await this.userEntity.find();
            this.logger.log(`All users found :: ${new Date()}`);
            return data;
        }
        catch (error) {
            (0, user_exception_service_1.UserException)(error, 'Get All Users', this.logger);
        }
    }
    async verifyUserLogin(email, password) {
        try {
            const data = await this.userEntity.findOne({
                where: { email },
                relations: {
                    profile: true,
                },
            });
            const isPasswordValid = await this.passwordService.verifyPassword(data.password, password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('Email or password incorrect', common_1.HttpStatus.UNAUTHORIZED);
            }
            delete data.password;
            return data;
        }
        catch (e) {
            (0, user_exception_service_1.UserException)(e, email, this.logger);
        }
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_service_1.PasswordService,
        profile_service_1.ProfileService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map