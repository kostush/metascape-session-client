import { DynamicModule, Module } from '@nestjs/common';
import { SessionClient } from './session-client';
import { RedisClientOptions } from '@redis/client/dist/lib/client';

@Module({})
export class SessionClientModule {
  static registerAsync(configurations?: RedisClientOptions): DynamicModule {
    return {
      module: SessionClientModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: configurations,
        },
        SessionClient,
      ],
      exports: [SessionClient],
    };
  }
}
