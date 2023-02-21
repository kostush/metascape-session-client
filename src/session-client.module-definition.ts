import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SessionClientModuleOptions } from './session-client-module-options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<SessionClientModuleOptions>().build();
