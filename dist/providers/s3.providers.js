"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
function createS3Providers(options) {
    return {
        provide: common_1.S3_TOKEN,
        useValue: common_1.createS3Client(options)
    };
}
exports.createS3Providers = createS3Providers;
//# sourceMappingURL=s3.providers.js.map