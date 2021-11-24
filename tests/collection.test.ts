import { Doc, DocTypes } from '../src';

describe('Collection Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('collection');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "Collection" THEN returns Collection class', () => {
      const collection = doc.get('Collection');

      expect(collection?.name).toEqual('Collection');
      expect(collection?.docType).toEqual(DocTypes.Class);
      expect(collection?.description).toEqual(
        'A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has\nan ID, for significantly improved performance and ease-of-use.'
      );
    });

    test('GIVEN getter for "Collection difference" THEN returns "Collection.difference" prop', () => {
      const difference = doc.get('Collection', 'difference');

      expect(difference?.name).toEqual('difference');
      expect(difference?.docType).toEqual(DocTypes.Method);
      expect(difference?.description).toEqual(
        'The difference method returns a new structure containing items where the key is present in one of the original structures but not the other.'
      );
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for Collection THEN returns Collection class', () => {
      const res = doc.search('Collection');

      const collection = res?.at(0);

      expect(collection?.name).toEqual('Collection');
      expect(collection?.docType).toEqual(DocTypes.Class);

      expect(collection?.description).toEqual(
        'A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has\n' +
          'an ID, for significantly improved performance and ease-of-use.'
      );
    });

    test('GIVEN search for Collection#difference THEN returns Collection.difference prop', () => {
      const res = doc.search('Collection#difference');

      const difference = res?.at(0);

      expect(difference?.name).toEqual('difference');
      expect(difference?.docType).toEqual(DocTypes.Method);
      expect(difference?.description).toEqual(
        'The difference method returns a new structure containing items where the key is present in one of the original structures but not the other.'
      );
    });

    test('GIVEN partial search for "Collection#findKe" THEN returns findKey method', () => {
      const res = doc.search('Collection#findKe');

      const findKey = res?.at(0);

      expect(findKey?.name).toEqual('findKey');
      expect(findKey?.docType).toEqual(DocTypes.Method);
      expect(findKey?.description).toEqual(
        'Searches for the key of a single item where the given function returns a truthy value. This behaves like\n[Array.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex),\nbut returns the key rather than the positional index.'
      );
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/collection/tree/main');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/collection/main/general/welcome');
    });
  });
});
