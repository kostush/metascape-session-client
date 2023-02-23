import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SessionClient } from './session-client';
export declare class SessionConnectionManager implements OnModuleInit, OnModuleDestroy {
    private readonly sessionClient;
    constructor(sessionClient: SessionClient);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
