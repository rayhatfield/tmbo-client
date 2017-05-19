import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	format: 'es',
	dest: 'lib/index.js',
	sourceMap: true,
	exports: 'named',
	plugins: [
		resolve(),
		babel({exclude: 'node_modules/**'})
	]
};
