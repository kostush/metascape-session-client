import { createClient } from 'redis';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { SessionInterface } from './session.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SessionClient {
  private redisClient;
  constructor(
    @Inject('CONFIG_OPTIONS') private configurations?: RedisClientOptions,
  ) {
    this.redisClient = createClient(configurations);
  }

  async setSession(
    sessionId: string,
    tokenId: string,
    expired?: number,
  ): Promise<void> {
    const sessionJson = JSON.stringify({
      tokenId: tokenId,
    } as SessionInterface);
    let expiredObj = {};
    if (expired) {
      expiredObj = { EX: expired };
    }
    await this.redisClient.set(sessionId, sessionJson, expiredObj);
  }

  async closeSession(sessionId: string): Promise<void> {
    await this.redisClient.del(sessionId);
  }

  async getSession(sessionId: string): Promise<SessionInterface | null> {
    return JSON.parse(
      await this.redisClient.get(sessionId),
    ) as SessionInterface;
  }

  async connect(): Promise<void> {
    await this.redisClient.connect();
  }

  async disconnect(): Promise<void> {
    await this.redisClient.disconnect();
  }
}
