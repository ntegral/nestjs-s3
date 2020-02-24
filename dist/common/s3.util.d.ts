import { S3ConfigOptions } from "../interfaces/s3-options.interface";
import * as S3 from 'aws-sdk/clients/s3';
export declare function createS3Client(options: S3ConfigOptions): S3;
