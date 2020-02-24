import { DynamicModule } from "@nestjs/common";
import { S3ConfigOptions, S3ConfigAsyncOptions } from "./interfaces";
export declare class S3CoreModule {
    static forRoot(options: S3ConfigOptions): DynamicModule;
    static forRootAsync(options: S3ConfigAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
