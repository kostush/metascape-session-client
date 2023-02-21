import { RedisClientOptions } from '@redis/client/dist/lib/client';
import { SessionInterface } from './session.interface';
export declare class SessionClient {
    private configurations?;
    private redisClient;
    constructor(configurations?: RedisClientOptions);
    setSession(sessionId: string, tokenId: string, expired?: number): Promise<void>;
    closeSession(sessionId: string): Promise<void>;
    getSession(sessionId: string): Promise<SessionInterface | null>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
