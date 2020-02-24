import { DynamicModule } from "@nestjs/common";
import { S3ConfigOptions, S3ConfigAsyncOptions } from "./interfaces";
import { S3CoreModule } from './s3-core.module';

export class S3Module {
    public static forRoot(options: S3ConfigOptions): DynamicModule {
        return {
            module: S3Module,
            imports: [S3CoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: S3ConfigAsyncOptions): DynamicModule {
        return {
            module: S3Module,
            imports: [S3CoreModule.forRootAsync(options)],
        };
    }
}