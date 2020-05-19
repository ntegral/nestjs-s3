import { S3ConfigOptions } from "../interfaces/s3-options.interface";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as https from 'https';

export function createS3Client(options: S3ConfigOptions): S3 {
    AWS.config.update({
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        sessionToken: options?.sessionToken,
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
    let params: S3.ClientConfiguration = {
        apiVersion: version
    };
    const client = new S3(params);
    return client;
}