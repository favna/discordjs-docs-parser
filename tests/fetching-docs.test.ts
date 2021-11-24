import { Doc, Sources } from '../src';
import { docCache } from '../src/lib/utils/constants';

describe('Fetching Docs', () => {
  test('GIVEN fetch request to DJS Main w/o cache THEN returns Main Docs', async () => {
    await Doc.fetch(Sources.Main);

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to DJS Stable THEN returns Stable Docs', async () => {
    await Doc.fetch(Sources.Stable);

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to RPC THEN returns RPC Docs', async () => {
    await Doc.fetch(Sources.Rpc);

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Collection THEN returns Collection Docs', async () => {
    await Doc.fetch(Sources.Collection);

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Builders THEN returns Builders Docs', async () => {
    await Doc.fetch(Sources.Builders);

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN fetch request to Voice with options THEN returns Voice Docs', async () => {
    await Doc.fetch(Sources.Voice);
    await Doc.fetch(Sources.Voice);
    await Doc.fetch(Sources.Voice, { force: true });

    expect(docCache.size).toBeGreaterThanOrEqual(1);
  });

  test('GIVEN invalid source THEN rejects', async () => {
    // @ts-expect-error error case
    await expect(() => Doc.fetch('invalid')).rejects.toThrowError(
      '[DiscordJsDocsParser] An invalid source was provided. Please make sure you\'re using the "Sources" exported enum'
    );
  });
});
