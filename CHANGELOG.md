# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2021-11-27)

### Features

- add setGlobalOptions ([859a67e](https://github.com/favna/discordjs-docs-parser/commit/859a67eabe1fe7753727fa502f83c57930ea6d79))
- allow child queryies to have `s-` for static ([7a55a15](https://github.com/favna/discordjs-docs-parser/commit/7a55a150260533de2361a3c1e03ccdbec272250f))
- change from fuse to jaro winkler ([f3d9a51](https://github.com/favna/discordjs-docs-parser/commit/f3d9a518f1ce81e5617c8ef35ec9ff41af727bee))
- implement most of the types and fix basic fetching ([b1a02c1](https://github.com/favna/discordjs-docs-parser/commit/b1a02c1fef229eaf393fec1688dc0d763413a864))
- restore `formatType` ([ffaebe2](https://github.com/favna/discordjs-docs-parser/commit/ffaebe2a4bc72e2b725d55214bfd438e98f3a59a))
- setup global options and built in link escaping ([c7a5587](https://github.com/favna/discordjs-docs-parser/commit/c7a5587c00b94a68ddfcd84d6307d5b17ab9953a))
- setup structure ([aaca8c3](https://github.com/favna/discordjs-docs-parser/commit/aaca8c3f38d94beb1223ec18e76c42b79b92edb9))

### Bug Fixes

- fixed baseDocsUrl resolutions ([a886671](https://github.com/favna/discordjs-docs-parser/commit/a88667184aaf323f39964cdc467cf5c5ac60ad71))
- fixed repoURL getter url ([fce7a37](https://github.com/favna/discordjs-docs-parser/commit/fce7a3766625c7d415c528909cb50d7ef64d3145))
- fixed rpc repo url ([c9fe46d](https://github.com/favna/discordjs-docs-parser/commit/c9fe46d1f4aa5162f50faecd87e44aa365d9417b))
- formatting fixes ([a4f7657](https://github.com/favna/discordjs-docs-parser/commit/a4f765788e842b9d997376acb6a93c4bf7946498))
- remove `formatType` again because it's beyond broken. Just use `doc.get` for sub types ([d53268c](https://github.com/favna/discordjs-docs-parser/commit/d53268cfe5696de8cdcc83bf2622ce380abc5848))
