import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
export interface S3ConfigOptions {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
    sessionToken?: string;
    apiVersion?: string;
}
export interface S3ConfigOptionsFactory {
    createS3ConfigOptions(): Promise<S3ConfigOptions> | S3ConfigOptions;
}
export interface S3ConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<S3ConfigOptionsFactory>;
    useExisting?: Type<S3ConfigOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<S3ConfigOptions> | S3ConfigOptions;
}
