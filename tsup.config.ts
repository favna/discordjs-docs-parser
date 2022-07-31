import type { Options } from 'tsup';

export const tsup: Options = {
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['esm', 'cjs'],
  minify: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: 'es2021',
  tsconfig: 'src/tsconfig.json'
};
