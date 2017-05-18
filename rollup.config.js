import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	format: 'es',
	dest: 'lib/index.js',
	sourceMap: true,
	exports: 'named',
	plugins: [
		babel({exclude: 'node_modules/**'})
	]
};
