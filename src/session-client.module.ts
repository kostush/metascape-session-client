import { Module } from '@nestjs/common';
import { SessionClient } from './session-client';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './session-client.module-definition';
import { SessionConnectionManager } from './session-connection-manager';

@Module({
  providers: [
    {
      provide: SessionClient,
      useFactory: (configurations?: RedisClientOptions) => {
        return new SessionClient(configurations);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    },
    SessionConnectionManager,
  ],
  exports: [SessionClient],
})
export class SessionClientModule extends ConfigurableModuleClass {}
