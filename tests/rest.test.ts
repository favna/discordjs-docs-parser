import { Doc, DocTypes } from '../src';

// TODO: Crawl broke something with rest docs in https://github.com/discordjs/discord.js/commit/c052f56f3ed3f624410c1f117051c5545d505bee
// Once that is fixed this can be unskipped
describe.skip('Rest Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('rest');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "REST" THEN returns REST class', () => {
      const rest = doc.get('REST');

      expect(rest?.name).toEqual('REST');
      expect(rest?.docType).toEqual(DocTypes.Class);
    });

    test('GIVEN getter for "REST get" THEN returns "REST.get" prop', () => {
      const restGet = doc.get('REST', 'get');

      expect(restGet?.name).toEqual('get');
      expect(restGet?.docType).toEqual(DocTypes.Method);
      expect(restGet?.description).toEqual('Runs a get request from the api');
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for REST THEN returns REST class', () => {
      const res = doc.search('REST');

      const rest = res?.at(0);

      expect(rest?.name).toEqual('REST');
      expect(rest?.docType).toEqual(DocTypes.Class);
    });

    test('GIVEN search for REST#get THEN returns REST.get prop', () => {
      const res = doc.search('REST#get');

      const restGet = res?.at(0);

      expect(restGet?.name).toEqual('get');
      expect(restGet?.docType).toEqual(DocTypes.Method);
      expect(restGet?.description).toEqual('Runs a get request from the api');
    });

    test('GIVEN partial search for "REST#req" THEN returns request method', () => {
      const res = doc.search('REST#req');

      const requestMethod = res?.at(0);

      expect(requestMethod?.name).toEqual('request');
      expect(requestMethod?.docType).toEqual(DocTypes.Method);
      expect(requestMethod?.description).toEqual('Runs a request from the api');
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/rest/tree/main');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/rest/main');
    });
  });
});
