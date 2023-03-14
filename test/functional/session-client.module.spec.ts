import { SessionClient } from '../../src';
import { Test } from '@nestjs/testing';
import { SessionClientModule } from '../../src/session-client.module';
import * as process from 'process';
import { NestApplication } from '@nestjs/core';

describe('Session-client-module', () => {
  let sessionClient: SessionClient;
  const sessionId = '1fd3583c-11c2-4486-87c3-7e714ea95703';
  const tokenId = '33725b85-480a-4f09-bd42-2f7a53c7ab67';
  const session2Id = '4e2bf62f-31ae-40f8-a31d-0beaeaca91b1';
  const token2Id = 'a96a092c-d8e7-4271-8451-fa24dfc7b02f';
  const password = process.env.REDIS_PASSWORD;
  const wrongPassword = 'wrongPassword';
  const host = process.env.REDIS_HOST;
  const url = 'redis://default:' + password + '@' + host;
  const wrongPasswordUrl = 'redis://default:' + wrongPassword + '@' + host;
  const updatedToken = '55525b85-480a-4f09-bd42-2f7a53c7ab67';
  const session = { tokenId: tokenId };
  const updatedSession = { tokenId: updatedToken };
  let app: NestApplication;

  beforeAll(async () => {
    const TestingModule = await Test.createTestingModule({
      imports: [SessionClientModule.register({ url: url })],
    }).compile();
    app = TestingModule.createNestApplication();
    await app.init();
    sessionClient = TestingModule.get<SessionClient>(SessionClient);
  });
  afterAll(async () => {
    if (app) {
      app.close();
    }
  });

  describe('Session Module', () => {
    it('sessionClient should be defined', async () => {
      expect(sessionClient).toBeDefined();
    });

    it('should failed duo to incorrect redis password ', async () => {
      try {
        new SessionClient({
          url: wrongPasswordUrl,
        });
      } catch (e) {
        expect(e.message).toContain(
          'WRONGPASS invalid username-password pair or user is disabled',
        );
      }
    });

    it('should not failed when closing not existing session', async () => {
      const result = await sessionClient.closeSession('Not_exist_sessionId');
      expect(result).toBeUndefined();
    });

    it('should return "null" then try to get not exist session', async () => {
      const sessionAfter = await sessionClient.getSession('not_exist_session');
      expect(sessionAfter).toBeNull();
    });

    it('should set session successfully', async () => {
      await sessionClient.setSession(sessionId, tokenId);
      const checkedSession = await sessionClient.getSession(sessionId);
      expect(checkedSession).toEqual(session);
    });

    it('should update session successfully', async () => {
      await sessionClient.setSession(sessionId, tokenId);
      await sessionClient.setSession(sessionId, updatedToken);
      const checkedSession = await sessionClient.getSession(sessionId);
      expect(checkedSession).toEqual(updatedSession);
      expect(checkedSession.tokenId).toBe(updatedToken);
    });

    it('should close session successfully ', async () => {
      await sessionClient.setSession(sessionId, tokenId);
      await sessionClient.closeSession(sessionId);
      const sessionAfter = await sessionClient.getSession(sessionId);
      expect(sessionAfter).toBeNull;
    });

    it('should close all session successfully ', async () => {
      await sessionClient.setSession(sessionId, tokenId);
      await sessionClient.setSession(session2Id, token2Id);
      await sessionClient.closeAllSessions([sessionId, session2Id]);
      const sessionAfter = await sessionClient.getSession(sessionId);
      const session2After = await sessionClient.getSession(session2Id);
      expect(sessionAfter).toBeNull;
      expect(session2After).toBeNull;
    });

    it('should expirate session successfully', async () => {
      const expired = 3;
      await sessionClient.setSession(sessionId, tokenId, expired);
      const checkedSession = await sessionClient.getSession(sessionId);
      expect(checkedSession).toEqual(session);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const checkedSessionAfterTimeOut = await sessionClient.getSession(
        sessionId,
      );
      expect(checkedSessionAfterTimeOut).toBeNull();
    });
  });
});
