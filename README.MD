[![npm version](http://img.shields.io/npm/v/@ntegral/nestjs-s3.svg?style=flat)](https://npmjs.org/package/@ntegral/nestjs-s3 "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/ntegral/nestjs-s3/master.svg?style=flat-square)](https://codecov.io/gh/ntegral/nestjs-s3)
[![ISC license](http://img.shields.io/badge/license-ISC-brightgreen.svg)](http://opensource.org/licenses/ISC)

<p align="center">
  <h3 align="center">
    @ntegral/nestjs-s3
  </h3>

  <p align="center">
    Provides an injectable S3 client to provide s3 storage access from nestjs modules
  </p>
</p>

## Table Of Contents

- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

`@ntegral/nestjs-s3` implements a module, `S3Module`, which when imported into
your nestjs project provides an S3 client to any class that injects it. This
lets AWS S3 be worked into your dependency injection workflow without having to
do any extra work outside of the initial setup.

## Installation

```bash
npm install --save @ntegral/nestjs-s3 aws-sdk
```

## Getting Started

The simplest way to use `@ntegral/nestjs-s3` is to use `S3Module.forRoot`

```typescript
import { Module } from '@nestjs-common';
import { S3Module } from '@ntegral/nestjs-s3';

@Module({
  imports: [
    S3Module.forRoot({
      accessKeyId: 'aws_access_key_id',
      secretAccessKey: 'aws_secret_access_key',
      region?: 'aws_region_id',
      sessionToken?: 'aws_session_token', | null, 
      apiVersion?: 's3_api_version' //based on s3 api version //
    }),
  ],
})
export class AppModule {}
```

The async way `@ntegral/nestjs-s3` is to use `S3Module.forRootAsync`

```typescript
import { Module } from '@nestjs-common';
import { S3Module } from '@ntegral/nestjs-s3';
import { ConfigModule } from '@ntegral/nestjs-config';
import { ConfigService } from '@ntegral/nestjs-config';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg:ConfigService) => ({
        accessKeyId: cfg.get('ACCESS_KEY_ID'),
        secretAccessKey: 'AWS_SECRET_ACCESS_KEY'
      }),
      inject: [ConfigService],
    })
  ]
})

export class AppModule {}
```

You can then inject the S3 client into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectS3 } from '@ntegral/nestjs-s3';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class AppService {
  public constructor(@InjectS3() private readonly client: S3) { }

  upload(pdf) {
        const params = {
        ACL: 'public-read',
        Body: pdf,
        Bucket: process.env.BUCKET,
        Key: uuidv4(),
        ContentEncoding: 'base64',
        ContentType: `application/pdf`
    };
    try {
        const { Location, Key } = await this.client.upload(params).promise();
        return Location;
    } catch (error) {
        console.log('ERROR S3 FILE UPLOAD => ', error);
    }
  }
}
```

## Contributing

I would greatly appreciate any contributions to make this project better. Please
make sure to follow the below guidelines before getting your hands dirty.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the ISC License. See `LICENSE` for more information.

## Acknowledgements

- [nestjs](https://nestjs.com)
- [aws-sdk](https://github.com/aws/aws-sdk-js)

Copyright &copy; 2020 Ntegral Inc.
