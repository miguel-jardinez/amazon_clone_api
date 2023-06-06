"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserException = exports.UserExceptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class UserExceptionService extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.UserExceptionService = UserExceptionService;
const UserException = (error, value, logger) => {
    var _a;
    const defaultMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : `Error in database ${value} :: ${new Date()}`;
    const defaultCode = (error === null || error === void 0 ? void 0 : error.message)
        ? common_1.HttpStatus.NOT_FOUND
        : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    if (error instanceof typeorm_1.QueryFailedError) {
        const data = error.driverError;
        const code = data.code;
        if (code === '23505') {
            const message = `${value} already exist`;
            logger.error(message);
            throw new UserExceptionService(message, common_1.HttpStatus.CONFLICT);
        }
    }
    logger.error(defaultMessage);
    throw new UserExceptionService(defaultMessage, defaultCode);
};
exports.UserException = UserException;
//# sourceMappingURL=user-exception.service.js.map