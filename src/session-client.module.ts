import { DynamicModule, Module } from '@nestjs/common';
import { SessionClient } from './session-client';

@Module({})
export class SessionClientModule {
  static register(): DynamicModule {
    return {
      module: SessionClientModule,
      providers: [SessionClient],
      exports: [SessionClient],
    };
  }
}
