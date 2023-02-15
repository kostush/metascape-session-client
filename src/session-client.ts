import { createClient } from 'redis';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { SessionInterface } from './session.interface';
export class SessionClient {
  private redisClient;
  constructor(configurations?: RedisClientOptions) {
    this.redisClient = createClient(configurations);
  }

  async setSession(sessionId: string, tokenId: string): Promise<void> {
    const sessionJson = JSON.stringify({
      tokenId: tokenId,
    } as SessionInterface);
    await this.redisClient.set(sessionId, sessionJson);
  }

  async closeSession(sessionId: string): Promise<void> {
    await this.redisClient.del(sessionId);
  }

  async getSession(sessionId: string): Promise<SessionInterface> {
    const session = JSON.parse(
      await this.redisClient.get(sessionId),
    ) as SessionInterface;
    return session;
  }

  async connect(): Promise<void> {
    await this.redisClient.connect();
  }

  async disconnect(): Promise<void> {
    await this.redisClient.disconnect();
  }
}
