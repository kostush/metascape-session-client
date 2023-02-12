import { SessionClient } from '../../src';

describe('SessionClient', () => {
  let client: SessionClient;
  const url = 'redis://default:admin@redis_test:6379';
  const sessionId = '1fd3583c-11c2-4486-87c3-7e714ea95703';
  const tokenId = '33725b85-480a-4f09-bd42-2f7a53c7ab67';

  afterAll(async () => {
    // Stop mock server with 3 endpoint
    client.disconnect();
  });
  it('should failed duo to incorrect passord session ', async () => {
    try {
      client = new SessionClient({
        url: 'redis://admin:wrongPassword@redis_test:6379',
      });
      await client.connect();
      await client.setSession(sessionId, tokenId);
      const checkedSession = await client.getsession(sessionId);
      await client.disconnect();
      expect(checkedSession).toBe('sdsv');
    } catch (e) {
      expect(e.context.toString()).toContain(
        'Error: WRONGPASS invalid username-password pair or user is disabled',
      );
    }
    await client.disconnect();
    //expect(checkedSession).toBe('sdsv');
  });

  it('should set session ', async () => {
    client = new SessionClient({
      url: url,
    });
    await client.connect();
    await client.setSession(sessionId, tokenId);
    const checkedSession = await client.getsession(sessionId);
    expect(checkedSession).toBe(tokenId);
  });

  it('should close session ', async () => {
    await client.closeSession(sessionId);
    const sessionAfter = await client.getsession(sessionId);
    expect(sessionAfter).toBeNull;
  });
});
