import { Inject } from '@nestjs/common';
import { S3_TOKEN } from "./s3.constants";

export function InjectS3() {
    return Inject(S3_TOKEN);
}