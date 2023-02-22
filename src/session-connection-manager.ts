import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SessionClient } from './session-client';

@Injectable()
export class SessionConnectionManager implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly sessionClient: SessionClient) {}

  async onModuleInit(): Promise<void> {
    await this.sessionClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.sessionClient.disconnect();
  }
}
