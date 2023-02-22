import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RedisClientOptions } from '@redis/client/dist/lib/client';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RedisClientOptions>().build();
