import { defineConfig, type PluginOption } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
    minify: 'terser',
    sourcemap: true,
  },
  plugins: [dts({ rollupTypes: true }), react(), peerDepsExternal()],
})
