import { Test } from '@nestjs/testing';

import { S3Module  } from './s3.module';
import { S3ConfigOptions, S3ConfigOptionsFactory } from './interfaces';
import { S3Service } from './services';
import { S3_TOKEN } from './common/';
import * as S3 from 'aws-sdk/clients/s3';

describe('S3Module', () => {
    let config: S3ConfigOptions = {
        accessKeyId:'---your access key---',
        secretAccessKey: '---your secret access key---',
    }

    class TestService implements S3ConfigOptionsFactory {
        createS3ConfigOptions(): S3ConfigOptions {
            return config;
        }
    }

    let s3config: S3ConfigOptions = {
        accessKeyId:'---your access key---',
        secretAccessKey: '---your secret access key---',
        apiVersion: '2006-03-01',
        sessionToken: undefined
    }

    class S3TestService implements S3ConfigOptionsFactory {
        createS3ConfigOptions(): S3ConfigOptions {
            return s3config;
        }
    }

    describe('forRoot', () => {
        it('should provide the sentry client', async() => {
            const mod = await Test.createTestingModule({
                imports: [S3Module.forRoot(config)],
            }).compile();

            const client = mod.get<S3Service>(S3_TOKEN);
            console.log('s3 client', client);
            expect(client).toBeDefined();
            expect(client).toBeInstanceOf(S3);
        });
    });

    describe('forRootAsync', () => {
        describe('when the `useFactory` option is used', () => {
            it('should provide s3 client', async () => {
                const mod = await Test.createTestingModule({
                    imports: [
                        S3Module.forRootAsync({
                            useFactory: () => (config),
                        }),
                    ]
                }).compile();

                const sentry = mod.get<S3Service>(S3_TOKEN);
                expect(sentry).toBeDefined();
                expect(sentry).toBeInstanceOf(S3);
            });
        })
    });

    describe('when the `useClass` option is used', () => {
        it('should provide the s3 client', async () => {
            const mod = await Test.createTestingModule({
                imports: [
                    S3Module.forRootAsync({
                        useClass: S3TestService
                    })
                ]
            }).compile();

            const sentry = mod.get<S3Service>(S3_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(S3);
        });
    });
})