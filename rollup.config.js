import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

const footer = `
if(typeof window !== 'undefined') {
  window.MUD_VERSION = '${pkg.version}'
}`;

export default {
  input: './src/Nighta.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      footer,
    },
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   exports: "auto",
    //   footer,
    // },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'Mud',
      exports: "auto",
      footer,
    },
  ],
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    commonjs(),
    resolve(),
    terser(),
    babel({ exclude: "node_modules/**" }),
    // filesize()
  ]
};