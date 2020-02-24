import { Test, TestingModule } from '@nestjs/testing';

import { S3ConfigOptions } from '../interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { InjectS3 } from './s3.decorator';
import * as S3 from 'aws-sdk/clients/s3';
import { S3Module } from '../s3.module';

describe('InjectS3', () => {

    let config: S3ConfigOptions = {
        accessKeyId:'---your access key---',
        secretAccessKey: '---your secret access key---',
    }
    let module: TestingModule;

    @Injectable()
    class InjectableService {
        public constructor(@InjectS3() public readonly client: S3) {}
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [S3Module.forRoot(config)],
            providers: [InjectableService],
        }).compile();
    });

    describe('when decorating a class constructor parameter', () => {
        it('should inject the s3 client', () => {
            const testService = module.get(InjectableService);
            expect(testService).toHaveProperty('client');
            expect(testService.client).toBeInstanceOf(S3);
        });
    });
})