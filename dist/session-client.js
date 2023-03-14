"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionClient = void 0;
const redis_1 = require("redis");
const common_1 = require("@nestjs/common");
let SessionClient = class SessionClient {
    constructor(configurations) {
        this.redisClient = (0, redis_1.createClient)(configurations);
    }
    async setSession(sessionId, tokenId, expiredInSec) {
        const sessionJson = JSON.stringify({
            tokenId: tokenId,
        });
        let expiredObj = {};
        if (expiredInSec) {
            expiredObj = { EX: expiredInSec };
        }
        await this.redisClient.set(sessionId, sessionJson, expiredObj);
    }
    async closeSession(sessionId) {
        await this.redisClient.del(sessionId);
    }
    async getSession(sessionId) {
        return JSON.parse(await this.redisClient.get(sessionId));
    }
    async connect() {
        await this.redisClient.connect();
    }
    async disconnect() {
        await this.redisClient.disconnect();
    }
    async closeAllSessions(sessionIds) {
        await sessionIds.forEach((sessionId) => {
            this.redisClient.del(sessionId);
        });
    }
};
SessionClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SessionClient);
exports.SessionClient = SessionClient;
//# sourceMappingURL=session-client.js.map