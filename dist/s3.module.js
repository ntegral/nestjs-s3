"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_core_module_1 = require("./s3-core.module");
class S3Module {
    static forRoot(options) {
        return {
            module: S3Module,
            imports: [s3_core_module_1.S3CoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: S3Module,
            imports: [s3_core_module_1.S3CoreModule.forRootAsync(options)],
        };
    }
}
exports.S3Module = S3Module;
//# sourceMappingURL=s3.module.js.map