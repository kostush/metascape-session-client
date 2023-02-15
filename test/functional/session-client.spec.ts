import { SessionClient } from '../../src';
import * as process from 'process';

describe('SessionClient', () => {
  let client: SessionClient;
  const password = process.env.REDIS_PASSWORD;
  const wrongPassword = 'wrongPassword';
  const host = process.env.REDIS_HOST;
  const url = 'redis://default:' + password + '@' + host;
  const wrongPasswordUrl = 'redis://default:' + wrongPassword + '@' + host;
  const sessionId = '1fd3583c-11c2-4486-87c3-7e714ea95703';
  const tokenId = '33725b85-480a-4f09-bd42-2f7a53c7ab67';
  const updatedToken = '55525b85-480a-4f09-bd42-2f7a53c7ab67';
  const session = { tokenId: tokenId };
  const updatedSession = { tokenId: updatedToken };

  beforeAll(async () => {
    client = new SessionClient({ url: url });
    client.connect();
  });
  afterAll(async () => {
    await client.disconnect();
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
  it('should return undefined then try to close not exist session', async () => {
    const result = await client.closeSession('Not_exist_sessionId');
    expect(result).toBeUndefined();
  });

  it('should return "null" then try to get not exist session', async () => {
    const sessionAfter = await client.getSession('not_exist_session');
    expect(sessionAfter).toBeNull();
  });

  it('should set session successfully', async () => {
    await client.setSession(sessionId, tokenId);
    const checkedSession = await client.getSession(sessionId);
    expect(checkedSession).toEqual(session);
  });

  it('should update session successfully', async () => {
    await client.setSession(sessionId, updatedToken);
    const checkedSession = await client.getSession(sessionId);
    expect(checkedSession).toEqual(updatedSession);
    expect(checkedSession.tokenId).toBe(updatedToken);
  });

  it('should close session successfully ', async () => {
    await client.closeSession(sessionId);
    const sessionAfter = await client.getSession(sessionId);
    expect(sessionAfter).toBeNull;
  });
});
