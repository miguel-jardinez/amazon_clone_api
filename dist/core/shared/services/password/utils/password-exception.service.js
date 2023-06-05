"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordException = exports.UserExceptionService = void 0;
const common_1 = require("@nestjs/common");
class UserExceptionService extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.UserExceptionService = UserExceptionService;
const PasswordException = (error) => {
    return new UserExceptionService(`${error.message}`, common_1.HttpStatus.NOT_ACCEPTABLE);
};
exports.PasswordException = PasswordException;
//# sourceMappingURL=password-exception.service.js.map