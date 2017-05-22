import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/index.js',
	format: 'es',
	dest: 'lib/index.js',
	sourceMap: true,
	external: [
		'query-string',
		'url'
	],
	plugins: [
		json(),
		babel({exclude: 'node_modules/**'}),
		commonjs()
	]
};
