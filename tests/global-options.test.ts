import { Doc } from '../src';

describe('Can change global options', () => {
  beforeEach(() => {
    Doc.setGlobalOptions({
      descriptionLimit: 2000,
      escapeMarkdownLinks: true
    });
  });

  afterEach(() => {
    Doc.setGlobalOptions({
      descriptionLimit: 1500,
      escapeMarkdownLinks: false
    });
  });

  test('GIVEN changing Global Options THEN options are changed', () => {
    expect(Doc.globalOptions.descriptionLimit).toBe(2000);
    expect(Doc.globalOptions.escapeMarkdownLinks).toBe(true);
  });
});
