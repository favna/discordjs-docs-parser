export function buildErrorMessage(message: string) {
  return `[DiscordJsDocsParser] ${message}`;
}

export function dissectURL(url: string) {
  const parts = url.slice(34).split('/');

  return [parts[0], parts[1], parts[3].slice(0, -5)];
}
