"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionClient = void 0;
const redis_1 = require("redis");
class SessionClient {
    constructor(configurations) {
        this.redisClient = (0, redis_1.createClient)(configurations);
    }
    async setSession(sessionId, tokenId) {
        const sessionJson = JSON.stringify({
            tokenId: tokenId,
        });
        await this.redisClient.set(sessionId, sessionJson);
    }
    async closeSession(sessionId) {
        await this.redisClient.del(sessionId);
    }
    async getSession(sessionId) {
        const session = JSON.parse(await this.redisClient.get(sessionId));
        return session;
    }
    async connect() {
        await this.redisClient.connect();
    }
    async disconnect() {
        await this.redisClient.disconnect();
    }
}
exports.SessionClient = SessionClient;
//# sourceMappingURL=session-client.js.map