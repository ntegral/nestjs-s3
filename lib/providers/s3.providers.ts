import { S3ConfigOptions } from "../interfaces";
import { S3_TOKEN, createS3Client } from "../common";
import { Provider } from "@nestjs/common";

export function createS3Providers(options: S3ConfigOptions): Provider {
    return {
        provide: S3_TOKEN,
        useValue: createS3Client(options)
    };
}