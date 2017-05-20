import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/index.js',
	format: 'es',
	dest: 'lib/index.js',
	sourceMap: true,
	plugins: [
		resolve(),
		json(),
		commonjs({
			// non-CommonJS modules will be ignored, but you can also
			// specifically include/exclude files
			include: 'node_modules/**',  // Default: undefined
		}),
		babel({exclude: 'node_modules/**'})
	]
};
