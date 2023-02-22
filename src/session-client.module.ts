import { DynamicModule, Module } from '@nestjs/common';
import { SessionClient } from './session-client';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { ConfigurableModuleClass } from './session-client.module-definition';
import { SessionConnectionManager } from './session-connection-manager';

@Module({})
export class SessionClientModule extends ConfigurableModuleClass {
  static register(configurations?: RedisClientOptions): DynamicModule {
    return {
      module: SessionClientModule,
      providers: [
        {
          provide: SessionClient,
          useValue: new SessionClient(configurations),
        },
        SessionConnectionManager,
      ],
      exports: [SessionClient],
    };
  }
}
