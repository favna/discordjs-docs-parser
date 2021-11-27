import { Doc } from '../src';
import { docCache } from '../src/lib/utils/constants';

describe('Fetching Docs', () => {
  test('GIVEN fetch request to DJS Main w/o cache THEN returns Main Docs', async () => {
    await Doc.fetch('main');

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to DJS Stable THEN returns Stable Docs', async () => {
    await Doc.fetch('stable');

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to RPC THEN returns RPC Docs', async () => {
    await Doc.fetch('rpc');

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Collection THEN returns Collection Docs', async () => {
    await Doc.fetch('collection');

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Builders THEN returns Builders Docs', async () => {
    await Doc.fetch('builders');

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Voice with options THEN returns Voice Docs', async () => {
    await Doc.fetch('voice');
    await Doc.fetch('voice');
    await Doc.fetch('voice', { force: true });

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN invalid source THEN rejects', async () => {
    // @ts-expect-error error case
    await expect(() => Doc.fetch('invalid')).rejects.toThrowError(
      '[DiscordJsDocsParser] An invalid source was provided. The valid sources are "stable", "main", "rpc", "collection", "builders", and "voice" '
    );
  });
});
