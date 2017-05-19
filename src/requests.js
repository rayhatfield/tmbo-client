// import {stringify} from 'query-string';
const queryString = require('query-string'); // why doesn't rollup like import {stringify} from 'query-string' ??

export const get = async (url, params = {}) => {
	const query = queryString.stringify(params);
	const result = await fetch(`${url}?${query}`)
	if (result.ok) {
		const json = await result.json();
		console.log(json);
		return json;
	}
	throw new Error;
};
