import type { Doc } from '../Doc';
import type { SourcesStringUnion } from './interfaces';

export const docCache = new Map<SourcesStringUnion, Doc>();

/**
 * The sources supported by this library
 */
export const sources = new Map<SourcesStringUnion, string>([
  ['stable', 'https://raw.githubusercontent.com/discordjs/docs/main/discord.js/stable.json'],
  ['main', 'https://raw.githubusercontent.com/discordjs/docs/main/discord.js/main.json'],
  ['rpc', 'https://raw.githubusercontent.com/discordjs/rpc/docs/master.json'],
  ['collection', 'https://raw.githubusercontent.com/discordjs/docs/main/collection/main.json'],
  ['builders', 'https://raw.githubusercontent.com/discordjs/docs/main/builders/main.json'],
  ['voice', 'https://raw.githubusercontent.com/discordjs/docs/main/voice/main.json'],
  ['rest', 'https://raw.githubusercontent.com/discordjs/docs/main/rest/main.json']
]);

export enum DocTypes {
  Class = 'class',
  Event = 'event',
  Interface = 'interface',
  Method = 'method',
  Param = 'param',
  Prop = 'prop',
  Typedef = 'typedef'
}
