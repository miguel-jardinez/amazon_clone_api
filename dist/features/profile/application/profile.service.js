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
var ProfileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_exception_service_1 = require("../utils/profile-exception.service");
const profile_entity_1 = require("./entities/profile.entity");
let ProfileService = ProfileService_1 = class ProfileService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
        this.logger = new common_1.Logger(ProfileService_1.name);
    }
    async createProfile(userId, createProfile) {
        var _a;
        try {
            const profile = this.profileRepository.create(Object.assign(Object.assign({}, createProfile), { user: { id: userId } }));
            const data = await this.profileRepository.save(profile);
            this.logger.log(`Profile created to user ${userId}`);
            return data;
        }
        catch (e) {
            this.logger.error(`Failed to create profile to user ${userId}`);
            throw new profile_exception_service_1.ProfileExceptionService(e.message, (_a = e.status) !== null && _a !== void 0 ? _a : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProfile(id, updateProfile) {
        var _a;
        try {
            const profile = await this.profileRepository.update({ id }, updateProfile);
            if (profile.affected === 0) {
                throw new common_1.HttpException(`Profile ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            this.logger.log(`Profile ${id} successfully updated`);
            return {
                message: `Profile ${id} successfully updated`,
            };
        }
        catch (e) {
            throw new profile_exception_service_1.ProfileExceptionService(e.message, (_a = e.code) !== null && _a !== void 0 ? _a : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProfile(user_id) {
        var _a;
        try {
            const profile = await this.profileRepository.findOneByOrFail({
                user: { id: user_id },
            });
            this.logger.log(`Profile found to user ${user_id}`);
            return profile;
        }
        catch (e) {
            throw new profile_exception_service_1.ProfileExceptionService(e.message, (_a = e.code) !== null && _a !== void 0 ? _a : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ProfileService = ProfileService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map