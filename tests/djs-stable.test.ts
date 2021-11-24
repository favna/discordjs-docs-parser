import { Doc, Sources } from '../src';
import { DocTypes } from '../src/lib/utils/enums';

describe('DiscordJS Stable Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch(Sources.Stable);
  });

  describe('Get', () => {
    test('GIVEN getter for "client" THEN returns Client class', () => {
      const clientDocClass = doc.get('client');

      expect(clientDocClass?.name).toEqual('Client');
      expect(clientDocClass?.docType).toEqual(DocTypes.Class);
      expect(clientDocClass?.description).toEqual('The main hub for interacting with the Discord API, and the starting point for any bot.');
    });

    test('GIVEN getter for "client user" THEN returns "Client.user" prop', () => {
      const clientUserProp = doc.get('client', 'user');

      expect(clientUserProp?.name).toEqual('user');
      expect(clientUserProp?.docType).toEqual(DocTypes.Prop);
      expect(clientUserProp?.description).toEqual('User that the client is logged in as');
    });
  });

  describe('Search', () => {
    test('GIVEN search for client THEN returns Client class', () => {
      const res = doc.search('client');

      const clientDocClass = res?.at(0);

      expect(clientDocClass?.name).toEqual('Client');
      expect(clientDocClass?.docType).toEqual(DocTypes.Class);
      expect(clientDocClass?.description).toEqual('The main hub for interacting with the Discord API, and the starting point for any bot.');
    });

    test('GIVEN search for client#user THEN returns Client.user prop', () => {
      const res = doc.search('client#user');

      const clientUserProp = res?.at(0);

      expect(clientUserProp?.name).toEqual('user');
      expect(clientUserProp?.docType).toEqual(DocTypes.Prop);
      expect(clientUserProp?.description).toEqual('User that the client is logged in as');
    });

    test('GIVEN partial search for "gui" THEN returns Guild class', () => {
      const res = doc.search('gui');

      const guildClass = res?.at(0);

      expect(guildClass?.name).toEqual('Guild');
      expect(guildClass?.docType).toEqual(DocTypes.Class);
      expect(guildClass?.description).toEqual(
        "Represents a guild (or a server) on Discord.\n<info>It's recommended to see if a guild is available before performing operations or reading data from it. You can\ncheck this with {@link Guild#available}.</info>"
      );
    });
  });
});
