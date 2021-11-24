import type { SourcesStringUnion } from './interfaces';

/**
 * The sources supported by this library
 */
export const sources = new Map<SourcesStringUnion, string>([
  ['stable', 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json'],
  ['main', 'https://raw.githubusercontent.com/discordjs/discord.js/docs/main.json'],
  ['rpc', 'https://raw.githubusercontent.com/discordjs/RPC/docs/master.json'],
  ['collection', 'https://raw.githubusercontent.com/discordjs/collection/docs/stable.json'],
  ['builders', 'https://raw.githubusercontent.com/discordjs/builders/docs/stable.json'],
  ['voice', 'https://raw.githubusercontent.com/discordjs/voice/docs/stable.json']
]);
