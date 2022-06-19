# Changelog

All notable changes to this project will be documented in this file.

# [1.3.0](https://github.com/favna/discordjs-docs-parser/compare/v1.2.0...v1.3.0) - (2022-06-19)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#80) ([4017bba](https://github.com/favna/discordjs-docs-parser/commit/4017bbad0c316942c932145bd694ca0222edd8ce))

## 📝 Documentation

- Fixed logo size ([cc7baf3](https://github.com/favna/discordjs-docs-parser/commit/cc7baf3cf7552da0273af6c97d60b9367b1df36d))
- Add @renovate-bot as a contributor ([39d2e7a](https://github.com/favna/discordjs-docs-parser/commit/39d2e7a9fbfc9ddcae379037fd0bffc88e3c26b2))
- Add @renovate[bot] as a contributor ([1298f53](https://github.com/favna/discordjs-docs-parser/commit/1298f5320cfdf50e80e3fe1439b5b4977fdbdd44))

## 🚀 Features

- Add top-level functions are per updated docgen ([c3a1567](https://github.com/favna/discordjs-docs-parser/commit/c3a1567595ef9321a158843889fe0d1dd6ca4952))

## 🧪 Testing

- Migrate to vitest ([565c2a4](https://github.com/favna/discordjs-docs-parser/commit/565c2a48a5f1999745ad11815fe3ce8287f8641f))
- Fix tests ([a58e65d](https://github.com/favna/discordjs-docs-parser/commit/a58e65d1d29176f4c9c29d2ecdf3966011dd28d0))

# [1.2.0](https://github.com/favna/discordjs-docs-parser/compare/v1.1.1...v1.2.0) - (2022-05-15)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([e822df9](https://github.com/favna/discordjs-docs-parser/commit/e822df9605f6bd049b3adbcdfdaef9233a0adc44))
- **deps:** Update react monorepo to v18 (#52) ([51362e2](https://github.com/favna/discordjs-docs-parser/commit/51362e28abfab93a1041dc1c40395dda16ede4fd))
- **deps:** Update all non-major dependencies ([00b8bc7](https://github.com/favna/discordjs-docs-parser/commit/00b8bc7a8856b3936dbfd84a944df0bbba0433c4))

## 🚀 Features

- Add `@discordjs/rest` doc search ([4c48fe0](https://github.com/favna/discordjs-docs-parser/commit/4c48fe04241a9b68839caf163ea7021cf5cdf90a))

## 🧪 Testing

- Add global options test ([9ec167a](https://github.com/favna/discordjs-docs-parser/commit/9ec167a5974614bf9a8008540d7b40d3754b213f))
- Fix builders test ([741307f](https://github.com/favna/discordjs-docs-parser/commit/741307f84d6bbdb53fd0911370bd6a7cfd52bae8))
- Update sourceUrl property ([8976ac6](https://github.com/favna/discordjs-docs-parser/commit/8976ac680eef39b80c0d53626e954872a7850b14))
- Update data points ([1221f98](https://github.com/favna/discordjs-docs-parser/commit/1221f983b8f6cd986080be7dfed0ee146c041309))

### [1.1.1](https://github.com/favna/discordjs-docs-parser/compare/v1.1.0...v1.1.1) (2022-01-07)

### Bug Fixes

- fixed the docs parsing for new DJS monorepo setup ([fac3229](https://github.com/favna/discordjs-docs-parser/commit/fac3229d0804f4df1fc6f4f632841ad24e4c14f8))

## [1.1.0](https://github.com/favna/discordjs-docs-parser/compare/v1.0.0...v1.1.0) (2022-01-01)

### Features

- **search:** make it possible to configure the jaro winkler minimum threshold ([75fd509](https://github.com/favna/discordjs-docs-parser/commit/75fd509f2db8ebf1f820ce3cbcaf1ad942e723dc))

### Bug Fixes

- ensure `formattedDescription` getter has escaped markdown links ([dd83fb7](https://github.com/favna/discordjs-docs-parser/commit/dd83fb7c743305be089eccc35f5f9e5abfe3d318))
- update dependencies to remove docs dependency ([56d86fc](https://github.com/favna/discordjs-docs-parser/commit/56d86fc2fa0b45a4a7fa732befda26f77ae9cb60))

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
