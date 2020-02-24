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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const S3 = require("aws-sdk/clients/s3");
const common_2 = require("../common");
let S3Service = class S3Service extends S3 {
    constructor(options) {
        super(options);
        this.options = options;
    }
};
S3Service = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_2.S3_CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map