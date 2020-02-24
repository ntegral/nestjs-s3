"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const s3_constants_1 = require("./s3.constants");
function InjectS3() {
    return common_1.Inject(s3_constants_1.S3_TOKEN);
}
exports.InjectS3 = InjectS3;
//# sourceMappingURL=s3.decorator.js.map