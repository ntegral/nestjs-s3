import * as S3 from 'aws-sdk/clients/s3';
import { S3ConfigOptions } from '../interfaces/s3-options.interface';
export declare class S3Service extends S3 {
    private options;
    constructor(options: S3ConfigOptions);
}
