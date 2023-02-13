import { SessionClient } from '../../src';
import * as process from 'process';

describe('SessionClient', () => {
  let client: SessionClient;
  const password = process.env.REDIS_PASSWORD;
  const host = process.env.REDIS_HOST;
  const user = process.env.REDIS_USER;
  const url = 'redis://default:' + password + '@' + host;
  const wrongPasswordUrl =
    'redis://' + user + ':' + 'wrongPassword' + '@' + host;
  const sessionId = '1fd3583c-11c2-4486-87c3-7e714ea95703';
  const tokenId = '33725b85-480a-4f09-bd42-2f7a53c7ab67';
  const updatedToken = '55525b85-480a-4f09-bd42-2f7a53c7ab67';
  const session = { tokenId: tokenId };
  const updatedSession = { tokenId: updatedToken };

  afterAll(async () => {
    // Stop mock server with 3 endpoint
    client.disconnect();
  });
  it('should failed duo to incorrect redis password ', async () => {
    try {
      client = new SessionClient({
        url: wrongPasswordUrl,
      });
      await client.connect();
      await client.setSession(sessionId, session);
      await client.getSession(sessionId);
      await client.disconnect();
    } catch (e) {
      expect(e.message).toContain(
        'WRONGPASS invalid username-password pair or user is disabled',
      );
    }
  });

  it('should set session successfully', async () => {
    client = new SessionClient({
      url: url,
    });
    await client.connect();
    await client.setSession(sessionId, session);
    const checkedSession = await client.getSession(sessionId);
    await client.disconnect();
    expect(checkedSession).toEqual(session);
  });

  it('should update session successfully', async () => {
    client = new SessionClient({
      url: url,
    });
    await client.connect();
    await client.setSession(sessionId, updatedSession);
    const checkedSession = await client.getSession(sessionId);
    await client.disconnect();
    expect(checkedSession).toEqual(updatedSession);
    expect(checkedSession.tokenId).toBe(updatedToken);
  });

  it('should close session successfully ', async () => {
    await client.connect();
    await client.closeSession(sessionId);
    const sessionAfter = await client.getSession(sessionId);
    //await client.disconnect();
    expect(sessionAfter).toBeNull;
  });
});
