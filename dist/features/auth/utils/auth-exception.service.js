"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthExceptionService = void 0;
const common_1 = require("@nestjs/common");
class AuthExceptionService extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.AuthExceptionService = AuthExceptionService;
//# sourceMappingURL=auth-exception.service.js.map