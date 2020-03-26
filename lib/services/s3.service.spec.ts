import { S3ConfigOptions, S3ConfigOptionsFactory } from "../interfaces";
import { Test } from "@nestjs/testing";
import { S3Module } from "../s3.module";
import { S3Service } from ".";
import { S3_TOKEN } from "../common/s3.constants";

describe('S3Service', () => {
    let config: S3ConfigOptions = {
        accessKeyId: '---your access key---',
        secretAccessKey: '---your secret access key---',
    };

    let failureConfig: S3ConfigOptions = {
        accessKeyId: '---your access key---',
        secretAccessKey: '---your secret access key---',
    };

    class TestService implements S3ConfigOptionsFactory {
        createS3ConfigOptions(): S3ConfigOptions {
            return config;
        }
    }

    class FailureService implements S3ConfigOptionsFactory {
        createS3ConfigOptions(): S3ConfigOptions {
            return failureConfig;
        }
    }

    describe('s3.service', () => {
        it('should provide the s3 client and call log', async() => {
            const mod = await Test.createTestingModule({
                imports: [
                    S3Module.forRootAsync({
                        useClass: TestService
                    })
                ]
            }).compile();

            const s3 = mod.get<S3Service>(S3_TOKEN);
            expect(s3).toBeDefined();
            console.log('s3', s3);
        });
    })

});