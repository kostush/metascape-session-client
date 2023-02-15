import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { SessionInterface } from './session.interface';
export declare class SessionClient {
    private redisClient;
    constructor(configurations?: RedisClientOptions);
    setSession(sessionId: string, tokenId: string): Promise<void>;
    closeSession(sessionId: string): Promise<void>;
    getSession(sessionId: string): Promise<SessionInterface>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
