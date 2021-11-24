import { Doc } from '../src';
import { DocTypes } from '../src/lib/utils/enums';

describe('RPC Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('rpc');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "RPCClient" THEN returns RPCClient class', () => {
      const rpcClient = doc.get('RPCClient');

      expect(rpcClient?.name).toEqual('RPCClient');
      expect(rpcClient?.docType).toEqual(DocTypes.Class);
      expect(rpcClient?.description).toEqual('The main hub for interacting with Discord RPC');

      expect(rpcClient?.formattedExtends).toEqual('(extends **BaseClient**)');
      expect(rpcClient?.formattedImplements).toEqual(null);
      expect(rpcClient?.formattedType).toEqual('');
      expect(rpcClient?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN getter for "RPCClient user" THEN returns "RPCClient.user" prop', () => {
      const user = doc.get('RPCClient', 'user');

      expect(user?.name).toEqual('user');
      expect(user?.docType).toEqual(DocTypes.Prop);
      expect(user?.description).toEqual('User used in this application');

      expect(user?.formattedExtends).toEqual(null);
      expect(user?.formattedImplements).toEqual(null);
      expect(user?.formattedType).toEqual('?**User**');
      expect(user?.formattedReturn).toEqual('**Void**');
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for RPCClient THEN returns RPCClient class', () => {
      const res = doc.search('RPCClient');

      const rpcClient = res?.at(0);

      expect(rpcClient?.name).toEqual('RPCClient');
      expect(rpcClient?.docType).toEqual(DocTypes.Class);
      expect(rpcClient?.description).toEqual('The main hub for interacting with Discord RPC');

      expect(rpcClient?.formattedExtends).toEqual('(extends **BaseClient**)');
      expect(rpcClient?.formattedImplements).toEqual(null);
      expect(rpcClient?.formattedType).toEqual('');
      expect(rpcClient?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN search for RPCClient#user THEN returns RPCClient.user prop', () => {
      const res = doc.search('RPCClient#user');

      const user = res?.at(0);

      expect(user?.name).toEqual('user');
      expect(user?.docType).toEqual(DocTypes.Prop);
      expect(user?.description).toEqual('User used in this application');

      expect(user?.formattedExtends).toEqual(null);
      expect(user?.formattedImplements).toEqual(null);
      expect(user?.formattedType).toEqual('?**User**');
      expect(user?.formattedReturn).toEqual('**Void**');
    });

    test('GIVEN partial search for "RPCClient#captureSh" THEN returns captureShortcut method', () => {
      const res = doc.search('RPCClient#captureSh');

      const captureShortcut = res?.at(0);

      expect(captureShortcut?.name).toEqual('captureShortcut');
      expect(captureShortcut?.docType).toEqual(DocTypes.Method);
      expect(captureShortcut?.description).toEqual(
        'Capture a shortcut using the client\nThe callback takes (key, stop) where `stop` is a function that will stop capturing.\nThis `stop` function must be called before disconnecting or else the user will have\nto restart their client.'
      );

      expect(captureShortcut?.formattedExtends).toEqual(null);
      expect(captureShortcut?.formattedImplements).toEqual(null);
      expect(captureShortcut?.formattedType).toEqual('');
      expect(captureShortcut?.formattedReturn).toEqual('**Promise\\<function\\(\\)\\>**');
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/rpc/tree/master');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/rpc/master/general/welcome');
    });
  });
});
