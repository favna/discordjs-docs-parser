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

      expect(clientDocClass?.formattedExtends).toEqual(
        '(extends **[BaseClient](https://discord.js.org/#/docs/main/stable/general/welcome/class/BaseClient)**)'
      );
      expect(clientDocClass?.formattedImplements).toEqual(null);
      expect(clientDocClass?.formattedType).toEqual('');
      expect(clientDocClass?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN getter for "client user" THEN returns "Client.user" prop', () => {
      const clientUserProp = doc.get('client', 'user');

      expect(clientUserProp?.name).toEqual('user');
      expect(clientUserProp?.docType).toEqual(DocTypes.Prop);
      expect(clientUserProp?.description).toEqual('User that the client is logged in as');

      expect(clientUserProp?.formattedExtends).toEqual(null);
      expect(clientUserProp?.formattedImplements).toEqual(null);
      expect(clientUserProp?.formattedType).toEqual('?**[ClientUser](https://discord.js.org/#/docs/main/stable/general/welcome/class/ClientUser)**');
      expect(clientUserProp?.formattedReturn).toEqual('**Void**');
    });
  });

  describe('Search', () => {
    test('GIVEN search for client THEN returns Client class', () => {
      const res = doc.search('client');

      const clientDocClass = res?.at(0);

      expect(clientDocClass?.name).toEqual('Client');
      expect(clientDocClass?.docType).toEqual(DocTypes.Class);
      expect(clientDocClass?.description).toEqual('The main hub for interacting with the Discord API, and the starting point for any bot.');

      expect(clientDocClass?.formattedExtends).toEqual(
        '(extends **[BaseClient](https://discord.js.org/#/docs/main/stable/general/welcome/class/BaseClient)**)'
      );
      expect(clientDocClass?.formattedImplements).toEqual(null);
      expect(clientDocClass?.formattedType).toEqual('');
      expect(clientDocClass?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN search for client#user THEN returns Client.user prop', () => {
      const res = doc.search('client#user');

      const clientUserProp = res?.at(0);

      expect(clientUserProp?.name).toEqual('user');
      expect(clientUserProp?.docType).toEqual(DocTypes.Prop);
      expect(clientUserProp?.description).toEqual('User that the client is logged in as');

      expect(clientUserProp?.formattedExtends).toEqual(null);
      expect(clientUserProp?.formattedImplements).toEqual(null);
      expect(clientUserProp?.formattedType).toEqual('?**[ClientUser](https://discord.js.org/#/docs/main/stable/general/welcome/class/ClientUser)**');
      expect(clientUserProp?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN partial search for "gui" THEN returns Guild class', () => {
      const res = doc.search('gui');

      const guildClass = res?.at(0);

      expect(guildClass?.name).toEqual('Guild');
      expect(guildClass?.docType).toEqual(DocTypes.Class);
      expect(guildClass?.description).toEqual(
        "Represents a guild (or a server) on Discord.\n<info>It's recommended to see if a guild is available before performing operations or reading data from it. You can\ncheck this with {@link Guild#available}.</info>"
      );

      expect(guildClass?.formattedExtends).toEqual(
        '(extends **[AnonymousGuild](https://discord.js.org/#/docs/main/stable/general/welcome/class/AnonymousGuild)**)'
      );
      expect(guildClass?.formattedImplements).toEqual(null);
      expect(guildClass?.formattedType).toEqual('');
      expect(guildClass?.formattedReturn).toEqual('**Void**');
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo stable branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/discord.js/blob/stable');
    });

    test('GIVEN baseDocsURL THEN returns djs stable docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/main/stable/general/welcome');
    });
  });
});
