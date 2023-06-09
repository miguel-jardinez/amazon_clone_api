"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || '3000';
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Amazon Clone Api')
        .setDescription('Amazon clone API for all kind of frontend applications')
        .setVersion('1.0')
        .addTag('Amazon Clone')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT);
}
bootstrap().then().catch();
//# sourceMappingURL=main.js.map