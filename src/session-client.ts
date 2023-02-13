import { createClient } from 'redis';
import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { SessionInterface } from './session.interface';
export class SessionClient {
  private redisClient;
  constructor(configurations?: RedisClientOptions) {
    this.redisClient = createClient(configurations);
  }

  async setSession(sessionId: string, session: SessionInterface) {
    const sessionJson = JSON.stringify(session);
    await this.redisClient.set(sessionId, sessionJson);
  }

  async closeSession(sessionId: string) {
    await this.redisClient.del(sessionId);
  }

  async getSession(sessionId: string) {
    const session = JSON.parse(
      await this.redisClient.get(sessionId),
    ) as SessionInterface;
    return session;
  }

  async connect() {
    await this.redisClient.connect();
  }

  async disconnect() {
    await this.redisClient.disconnect();
  }
}
