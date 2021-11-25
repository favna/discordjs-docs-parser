import { Doc, DocTypes } from '../src';

describe('DiscordJS Main Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('main');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "client" THEN returns Client class', () => {
      const client = doc.get('client');

      expect(client?.name).toEqual('Client');
      expect(client?.docType).toEqual(DocTypes.Class);
      expect(client?.description).toEqual('The main hub for interacting with the Discord API, and the starting point for any bot.');
    });

    test('GIVEN getter for "client user" THEN returns "Client.user" prop', () => {
      const clientUser = doc.get('client', 'user');

      expect(clientUser?.name).toEqual('user');
      expect(clientUser?.docType).toEqual(DocTypes.Prop);
      expect(clientUser?.description).toEqual('User that the client is logged in as');
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for client THEN returns Client class', () => {
      const res = doc.search('client');

      const client = res?.at(0);

      expect(client?.name).toEqual('Client');
      expect(client?.docType).toEqual(DocTypes.Class);
      expect(client?.description).toEqual('The main hub for interacting with the Discord API, and the starting point for any bot.');
    });

    test('GIVEN search for client#user THEN returns Client.user prop', () => {
      const res = doc.search('client#user');

      const clientUser = res?.at(0);

      expect(clientUser?.name).toEqual('user');
      expect(clientUser?.docType).toEqual(DocTypes.Prop);
      expect(clientUser?.description).toEqual('User that the client is logged in as');
    });

    test('GIVEN partial search for "gui" THEN returns Guild class', () => {
      const res = doc.search('gui');

      const guild = res?.at(0);

      expect(guild?.name).toEqual('Guild');
      expect(guild?.docType).toEqual(DocTypes.Class);
      expect(guild?.description).toEqual(
        "Represents a guild (or a server) on Discord.\n<info>It's recommended to see if a guild is available before performing operations or reading data from it. You can\ncheck this with {@link Guild#available}.</info>"
      );
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/discord.js/tree/main');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/main/main/general/welcome');
    });
  });
});