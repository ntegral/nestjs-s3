import { Global, Module, DynamicModule, Provider, Type } from "@nestjs/common";
import { S3ConfigOptions, S3ConfigAsyncOptions, S3ConfigOptionsFactory } from "./interfaces";
import { createS3Providers } from "./providers";
import { S3Service } from "./services/s3.service";
import { S3_CONFIG_OPTIONS, S3_TOKEN, createS3Client } from "./common";


@Global()
@Module({})
export class S3CoreModule {

    public static forRoot(options: S3ConfigOptions): DynamicModule {
        const provider = createS3Providers(options);

        return {
            exports: [provider],
            module: S3CoreModule,
            providers: [provider]
        };
    }

    public static forRootAsync(options: S3ConfigAsyncOptions): DynamicModule {
        const provider: Provider = {
            inject: [S3_CONFIG_OPTIONS],
            provide: S3_TOKEN,
            useFactory: (options: S3ConfigOptions) => createS3Client(options),
        };

        return {
            exports: [provider, S3Service],
            imports: options.imports,
            module: S3CoreModule,
            providers: [
                ...this.createAsyncProviders(options),
                provider,
                S3Service
            ],
        };
    }

    private static createAsyncProviders(
        options: S3ConfigAsyncOptions,
      ): Provider[] {
        if (options.useExisting || options.useFactory) {
          return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass as Type<S3ConfigOptionsFactory>;
        return [
          this.createAsyncOptionsProvider(options),
          {
            provide: useClass,
            useClass,
          },
        ];
      }
    
      private static createAsyncOptionsProvider(
        options: S3ConfigAsyncOptions,
      ): Provider {
        if (options.useFactory) {
          return {
            inject: options.inject || [],
            provide: S3_CONFIG_OPTIONS,
            useFactory: options.useFactory,
          };
        }
        const inject = [
          (options.useClass || options.useExisting) as Type<S3ConfigOptionsFactory>,
        ];
        return {
          provide: S3_CONFIG_OPTIONS,
          useFactory: async (optionsFactory: S3ConfigOptionsFactory) =>
            await optionsFactory.createS3ConfigOptions(),
          inject,
        };
      }
}