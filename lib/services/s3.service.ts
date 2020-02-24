import { Injectable, Inject } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';
import { S3ConfigOptions } from '../interfaces/s3-options.interface';
import { S3_CONFIG_OPTIONS } from '../common';

@Injectable()
export class S3Service extends S3 {
    constructor(
        @Inject(S3_CONFIG_OPTIONS) private options: S3ConfigOptions
    ){
        super(options);
    }
}