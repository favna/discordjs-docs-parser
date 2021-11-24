import { Sources } from './enums';

/**
 * The sources supported by this library
 */
export const sources = new Map<Sources, string>([
  [Sources.Stable, 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json'],
  [Sources.Main, 'https://raw.githubusercontent.com/discordjs/discord.js/docs/main.json'],
  [Sources.Rpc, 'https://raw.githubusercontent.com/discordjs/RPC/docs/master.json'],
  [Sources.Collection, 'https://raw.githubusercontent.com/discordjs/collection/docs/stable.json'],
  [Sources.Builders, 'https://raw.githubusercontent.com/discordjs/builders/docs/stable.json'],
  [Sources.Voice, 'https://raw.githubusercontent.com/discordjs/voice/docs/stable.json']
]);
