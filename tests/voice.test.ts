import { Doc, DocTypes } from '../src';

describe('Voice Docs', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('voice');
  });

  describe('Direct Getting', () => {
    test('GIVEN getter for "AudioPlayer" THEN returns AudioPlayer class', () => {
      const AudioPlayer = doc.get('AudioPlayer');

      expect(AudioPlayer?.name).toEqual('AudioPlayer');
      expect(AudioPlayer?.docType).toEqual(DocTypes.Class);
      expect(AudioPlayer?.description).toEqual('Used to play audio resources (i.e. tracks, streams) to voice connections.');
    });

    test('GIVEN getter for "AudioPlayer getMaxListeners" THEN returns "AudioPlayer.getMaxListeners" prop', () => {
      const user = doc.get('AudioPlayer', 'getMaxListeners');

      expect(user?.name).toEqual('getMaxListeners');
      expect(user?.docType).toEqual(DocTypes.Method);
      expect(user?.description).toEqual(null);
    });
  });

  describe('Fuzzy Searching', () => {
    test('GIVEN search for AudioPlayer THEN returns AudioPlayer class', () => {
      const res = doc.search('AudioPlayer');

      const AudioPlayer = res?.at(0);

      expect(AudioPlayer?.name).toEqual('AudioPlayer');
      expect(AudioPlayer?.docType).toEqual(DocTypes.Class);
      expect(AudioPlayer?.description).toEqual('Used to play audio resources (i.e. tracks, streams) to voice connections.');
    });

    test('GIVEN search for AudioPlayer#getMaxListeners THEN returns AudioPlayer.getMaxListeners prop', () => {
      const res = doc.search('AudioPlayer#getMaxListeners');

      const getMaxListeners = res?.at(0);

      expect(getMaxListeners?.name).toEqual('getMaxListeners');
      expect(getMaxListeners?.docType).toEqual(DocTypes.Method);
      expect(getMaxListeners?.description).toEqual(null);
    });

    test('GIVEN partial search for "AudioPlayer#playab" THEN returns playable method', () => {
      const res = doc.search('AudioPlayer#playab');

      const playable = res?.at(0);

      expect(playable?.name).toEqual('playable');
      expect(playable?.docType).toEqual(DocTypes.Prop);
      expect(playable?.description).toEqual('A list of subscribed voice connections that can currently receive audio to play.');
    });
  });

  describe('Doc Properties', () => {
    test('GIVEN repoURL THEN returns djs repo main branch', () => {
      expect(doc.repoURL).toEqual('https://github.com/discordjs/voice/tree/main');
    });

    test('GIVEN baseDocsURL THEN returns djs main docs url', () => {
      expect(doc.baseDocsURL).toEqual('https://discord.js.org/#/docs/voice/main/general/welcome');
    });
  });
});
