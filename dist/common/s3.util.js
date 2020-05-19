"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk/global");
const S3 = require("aws-sdk/clients/s3");
const https = require("https");
function createS3Client(options) {
    AWS.config.update({
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        sessionToken: options === null || options === void 0 ? void 0 : options.sessionToken,
        region: options.region
    });
    if (options.maxSockets) {
        AWS.config.update({
            httpOptions: {
                agent: new https.Agent({
                    maxSockets: options.maxSockets
                })
            }
        });
    }
    let version = options.apiVersion === undefined ? '2006-03-01' : options.apiVersion;
    let params = {
        apiVersion: version
    };
    const client = new S3(params);
    return client;
}
exports.createS3Client = createS3Client;
//# sourceMappingURL=s3.util.js.map