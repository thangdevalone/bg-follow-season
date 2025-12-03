import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    react: 'src/react/SeasonBackground.tsx',
    vue: 'src/vue/plugin.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  target: 'es2019',
  external: ['react', 'react-dom', 'vue'],
  treeshake: true
});


