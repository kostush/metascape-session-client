import { DynamicModule } from '@nestjs/common';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { ConfigurableModuleClass } from './session-client.module-definition';
export declare class SessionClientModule extends ConfigurableModuleClass {
    static register(configurations?: RedisClientOptions): DynamicModule;
}
