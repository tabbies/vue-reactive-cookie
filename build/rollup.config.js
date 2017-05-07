import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const minify = process.env.minify || false;

export default {
  entry: 'src/vue-reactive-cookie.js',

  dest: `dist/vue-reactive-cookie${minify ? '.min' : ''}.js`,

  format: 'umd',

  moduleName: 'VueReactiveCookie',

  plugins: [
    buble(),

    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),

    commonjs({ include: 'node_modules/**' }),

    minify ? uglify() : {},
  ],
};
