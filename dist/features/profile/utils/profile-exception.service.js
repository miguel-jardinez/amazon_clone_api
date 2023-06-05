"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileExceptionService = void 0;
const common_1 = require("@nestjs/common");
class ProfileExceptionService extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.ProfileExceptionService = ProfileExceptionService;
//# sourceMappingURL=profile-exception.service.js.map