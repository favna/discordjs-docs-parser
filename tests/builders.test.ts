import { Doc, DocTypes } from '../src';

describe('Builders Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('builders');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "SlashCommandBuilder" THEN returns SlashCommandBuilder class', () => {
      const slashCommandBuilderClient = doc.get('SlashCommandBuilder');

      expect(slashCommandBuilderClient?.name).toEqual('SlashCommandBuilder');
      expect(slashCommandBuilderClient?.docType).toEqual(DocTypes.Class);
      expect(slashCommandBuilderClient?.description).toEqual(null);
    });

    test('GIVEN getter for "SlashCommandBuilder name" THEN returns "SlashCommandBuilder.name" prop', () => {
      const user = doc.get('SlashCommandBuilder', 'name');

      expect(user?.name).toEqual('name');
      expect(user?.docType).toEqual(DocTypes.Prop);
      expect(user?.description).toEqual('The name of this slash command');
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for BUILDERSClient THEN returns BUILDERSClient class', () => {
      const res = doc.search('SlashCommandBuilder');

      const slashCommandBuilderClient = res?.at(0);

      expect(slashCommandBuilderClient?.name).toEqual('SlashCommandBuilder');
      expect(slashCommandBuilderClient?.docType).toEqual(DocTypes.Class);
      expect(slashCommandBuilderClient?.description).toEqual(null);
    });

    test('GIVEN search for SlashCommandBuilder#user THEN returns SlashCommandBuilder.name prop', () => {
      const res = doc.search('SlashCommandBuilder#name');

      const user = res?.at(0);

      expect(user?.name).toEqual('name');
      expect(user?.docType).toEqual(DocTypes.Prop);
      expect(user?.description).toEqual('The name of this slash command');
    });

    test('GIVEN partial search for "SlashCommandBuilder#defaultPermi" THEN returns defaultPermission method', () => {
      const res = doc.search('SlashCommandBuilder#defaultPermi');

      const defaultPermission = res?.at(0);

      expect(defaultPermission?.name).toEqual('defaultPermission');
      expect(defaultPermission?.docType).toEqual(DocTypes.Prop);
      expect(defaultPermission?.description).toEqual('Whether the command is enabled by default when the app is added to a guild');
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/builders/tree/main');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/builders/main/general/welcome');
    });
  });
});
