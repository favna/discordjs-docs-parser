import { Doc } from '../src';

describe('All fields', () => {
  let doc: Doc;

  beforeAll(async () => {
    doc = await Doc.fetch('main');
  });

  test('GIVEN doc getters THEN returns proper result', () => {
    expect(doc.classes?.length).toBeGreaterThanOrEqual(100);
    expect(doc.typedefs?.length).toBeGreaterThanOrEqual(200);
    expect(doc.interfaces?.length).toBe(2);
    expect(doc.props?.length).toBe(undefined);
    expect(doc.methods?.length).toBe(undefined);
    expect(doc.events?.length).toBe(undefined);
    expect(doc.params?.length).toBe(undefined);
  });

  test('GIVEN Client getters THEN returns proper results', () => {
    const client = doc.get('client');

    expect(client?.classes?.length).toBe(undefined);
    expect(client?.typedefs?.length).toBe(undefined);
    expect(client?.interfaces?.length).toBe(undefined);
    expect(client?.props?.length).toBeGreaterThanOrEqual(10);
    expect(client?.methods?.length).toBe(16);
    expect(client?.events?.length).toBeGreaterThanOrEqual(60);
    expect(client?.params?.length).toBe(undefined);

    expect(client?.url).toBe('https://discord.js.org/#/docs/discord.js/main/class/Client');
    expect(client?.formattedName).toBe('Client');

    expect(JSON.stringify(client)).toEqual(
      JSON.stringify({
        name: 'Client',
        description: 'The main hub for interacting with the Discord API, and the starting point for any bot.',
        internal_type: 'class',
        props: [
          'ws',
          'actions',
          'voice',
          'shard',
          'users',
          'guilds',
          'channels',
          'sweepers',
          'presence',
          'token',
          'user',
          'application',
          'readyTimestamp',
          'emojis',
          'readyAt',
          'uptime',
          'options',
          'rest'
        ],
        methods: [
          'login',
          'isReady',
          'destroy',
          'fetchInvite',
          'fetchGuildTemplate',
          'fetchWebhook',
          'fetchVoiceRegions',
          'fetchSticker',
          'fetchPremiumStickerPacks',
          'fetchGuildPreview',
          'fetchGuildWidget',
          'generateInvite',
          '_eval',
          '_validateOptions',
          'incrementMaxListeners',
          'decrementMaxListeners'
        ],
        events: [
          'channelCreate',
          'channelDelete',
          'guildBanAdd',
          'guildBanRemove',
          'guildUnavailable',
          'guildDelete',
          'emojiCreate',
          'emojiDelete',
          'emojiUpdate',
          'guildIntegrationsUpdate',
          'guildMemberRemove',
          'guildMemberUpdate',
          'guildMemberAvailable',
          'roleCreate',
          'roleDelete',
          'roleUpdate',
          'guildScheduledEventCreate',
          'guildScheduledEventDelete',
          'guildScheduledEventUpdate',
          'guildScheduledEventUserAdd',
          'guildScheduledEventUserRemove',
          'stickerCreate',
          'stickerDelete',
          'stickerUpdate',
          'guildUpdate',
          'interactionCreate',
          'inviteCreate',
          'inviteDelete',
          'messageCreate',
          'messageDelete',
          'messageDeleteBulk',
          'messageReactionAdd',
          'messageReactionRemove',
          'messageReactionRemoveAll',
          'messageReactionRemoveEmoji',
          'presenceUpdate',
          'stageInstanceCreate',
          'stageInstanceDelete',
          'stageInstanceUpdate',
          'threadCreate',
          'threadDelete',
          'threadListSync',
          'threadMembersUpdate',
          'threadMemberUpdate',
          'typingStart',
          'userUpdate',
          'voiceStateUpdate',
          'webhookUpdate',
          'debug',
          'warn',
          'channelPinsUpdate',
          'channelUpdate',
          'guildCreate',
          'guildMemberAdd',
          'guildMembersChunk',
          'messageUpdate',
          'shardResume',
          'threadUpdate',
          'shardReady',
          'shardDisconnect',
          'shardReconnecting',
          'invalidated',
          'ready',
          'shardError',
          'error'
        ]
      })
    );

    // Add mocked return values for "else" cases
    jest.spyOn(client!, 'url', 'get').mockReturnValue(null);
    const originalName = client!.name;
    const originalMeta = client!.meta;

    client!.name = null;
    client!.meta = null;

    expect(client?.formattedName).toBe('');
    expect(client?.sourceURL).toBe(null);
    expect(client?.link).toBe('');

    client!.name ??= originalName;
    client!.meta ??= originalMeta;
    jest.restoreAllMocks();
  });

  test('GIVEN Client.login getters THEN returns proper results', () => {
    const clientLogin = doc.get('client', 'login()');

    expect(clientLogin?.classes?.length).toBe(undefined);
    expect(clientLogin?.typedefs?.length).toBe(undefined);
    expect(clientLogin?.interfaces?.length).toBe(undefined);
    expect(clientLogin?.props?.length).toBe(undefined);
    expect(clientLogin?.methods?.length).toBe(undefined);
    expect(clientLogin?.events?.length).toBe(undefined);
    expect(clientLogin?.params?.length).toBe(1);

    expect(clientLogin?.formattedName).toBe('Client#login()');
    expect(JSON.stringify(clientLogin)).toEqual(
      JSON.stringify({
        name: 'login',
        description: 'Logs the client in, establishing a WebSocket connection to Discord.',
        internal_type: 'method',
        parent: 'Client',
        params: ['{"name":"token","description":"Token of the account to log in with","internal_type":"param","parent":"login","type":"string"}'],
        examples: ["client.login('my token');"],
        returns: {
          type: 'Promise<string>',
          description: 'Token of the account used'
        }
      })
    );
  });

  test('GIVEN Client.fetchWebhook.id getters THEN returns proper results', () => {
    const clientFetchWebhook = doc.get('client', 'fetchWebhook', 'id');

    expect(clientFetchWebhook?.formattedName).toBe('`id`');
    expect(clientFetchWebhook?.url).toBe(null);
  });

  test('GIVEN Client.fetchWebhook.token getters THEN returns proper results', () => {
    const clientFetchWebhook = doc.get('client', 'fetchWebhook', 'token');

    expect(clientFetchWebhook?.formattedName).toBe('`[token]`');
    expect(clientFetchWebhook?.url).toBe(null);
  });

  test('GIVEN Client#ready THEN returns proper results', () => {
    const clientReady = doc.get('client', 'e-ready');

    expect(clientReady?.classes?.length).toBe(undefined);
    expect(clientReady?.typedefs?.length).toBe(undefined);
    expect(clientReady?.interfaces?.length).toBe(undefined);
    expect(clientReady?.props?.length).toBe(undefined);
    expect(clientReady?.methods?.length).toBe(undefined);
    expect(clientReady?.events?.length).toBe(undefined);
    expect(clientReady?.params?.length).toBe(1);

    expect(clientReady?.formattedName).toBe('Client#ready');
    expect(clientReady?.formattedDescription).toBe('Emitted when the client becomes ready to start working.');

    expect(clientReady?.url).toBe('https://discord.js.org/#/docs/discord.js/main/class/Client?scrollTo=e-ready');
    expect(clientReady?.sourceURL).toBe('https://github.com/discordjs/discord.js/tree/main/src/client/websocket/WebSocketManager.js#L379');
    expect(clientReady?.link).toBe('[Client#ready](https://discord.js.org/#/docs/discord.js/main/class/Client?scrollTo=e-ready)');

    // Force parent to null for formattedName
    const originalParent = clientReady!.parent;
    clientReady!.parent = null;
    expect(clientReady?.formattedName).toBe('#ready');
    clientReady!.parent = originalParent;
  });

  test('GIVEN Client.destroy THEN returns proper results', () => {
    const clientDestroy = doc.get('client', 'destroy');

    expect(clientDestroy?.formattedName).toBe('Client#destroy()');
    expect(JSON.stringify(clientDestroy)).toEqual(
      JSON.stringify({
        name: 'destroy',
        description: 'Logs out, terminates the connection to Discord, and destroys the client.',
        internal_type: 'method',
        parent: 'Client',
        returns: {
          type: 'void'
        }
      })
    );

    // Force parent to null for formattedName
    const originalParent = clientDestroy!.parent;
    clientDestroy!.parent = null;
    expect(clientDestroy?.formattedName).toBe('#destroy()');
    clientDestroy!.parent = originalParent;
  });

  test('GIVEN Message#deletable THEN returns proper results', () => {
    const messageDeletable = doc.get('message', 'deletable');

    expect(messageDeletable?.formattedName).toBe('Message#deletable');

    // Force parent to null for formattedName
    const originalParent = messageDeletable!.parent;
    messageDeletable!.parent = null;
    expect(messageDeletable?.formattedName).toBe('#deletable');
    messageDeletable!.parent = originalParent;
  });

  test('GIVEN static properties and methods THEN returns proper results', () => {
    const staticProperty = doc.get('ActivityFlagsBitField', 'Flags');
    const staticMethod = doc.get('s-ApplicationCommand', 's-optionsEqual');

    expect(staticProperty?.formattedName).toBe('ActivityFlagsBitField.Flags');
    expect(staticProperty?.url).toBe('https://discord.js.org/#/docs/discord.js/main/class/ActivityFlagsBitField?scrollTo=s-Flags');

    expect(staticMethod?.formattedName).toBe('ApplicationCommand.optionsEqual()');
    expect(staticMethod?.url).toBe('https://discord.js.org/#/docs/discord.js/main/class/ApplicationCommand?scrollTo=s-optionsEqual');
  });

  test('GIVEN custom global options THEN returns different results', () => {
    Doc.globalOptions.escapeMarkdownLinks = true;
    Doc.globalOptions.descriptionLimit = 20;

    const createMessageComponentCollector = doc.get('message', 'createMessageComponentCollector');

    expect(createMessageComponentCollector?.formattedName).toBe('Message#createMessageComponentCollector()');

    expect(JSON.stringify(createMessageComponentCollector)).toEqual(
      JSON.stringify({
        name: 'createMessageComponentCollector',
        description: 'Creates a message component interaction collector.',
        internal_type: 'method',
        parent: 'Message',
        params: [
          '{"name":"options","description":"Options to send to the collector","internal_type":"param","parent":"createMessageComponentCollector","type":"MessageComponentCollectorOptions"}'
        ],
        examples: [
          // eslint-disable-next-line no-template-curly-in-string
          "// Create a message component interaction collector\nconst filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';\nconst collector = message.createMessageComponentCollector({ filter, time: 15_000 });\ncollector.on('collect', i => console.log(`Collected ${i.customId}`));\ncollector.on('end', collected => console.log(`Collected ${collected.size} items`));"
        ],
        returns: {
          type: 'InteractionCollector'
        }
      })
    );

    expect(createMessageComponentCollector?.link).toBe(
      '[Message#createMessageComponentCollector()](<https://discord.js.org/#/docs/discord.js/main/class/Message?scrollTo=createMessageComponentCollector>)'
    );
    expect(createMessageComponentCollector?.formattedDescription).toBe(
      'Creates a...\nDescription truncated. View full description [here](https://discord.js.org/#/docs/discord.js/main/class/Message?scrollTo=createMessageComponentCollector).'
    );

    Doc.globalOptions.escapeMarkdownLinks = false;
    Doc.globalOptions.descriptionLimit = 1500;
  });
});
