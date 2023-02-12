import { createClient } from 'redis';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
export class SessionClient {
  private redisClient;
  constructor(configurations?: RedisClientOptions) {
    this.redisClient = createClient(configurations);
  }

  async setSession(sessionId: string, tokenId: string) {
    await this.redisClient.set(sessionId, tokenId);
  }

  async closeSession(sessionId: string) {
    await this.redisClient.del(sessionId);
  }

  async getsession(sessionId: string) {
    const session = await this.redisClient.get(sessionId);
    return session;
  }

  async connect() {
    await this.redisClient.connect();
  }

  async disconnect() {
    await this.redisClient.disconnect();
  }
}
