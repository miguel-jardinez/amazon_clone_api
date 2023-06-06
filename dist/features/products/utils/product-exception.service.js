"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductExceptionService = void 0;
const common_1 = require("@nestjs/common");
class ProductExceptionService extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.ProductExceptionService = ProductExceptionService;
//# sourceMappingURL=product-exception.service.js.map