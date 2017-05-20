import {stringify} from 'query-string';

export async function get (url, params = {}) {
	const query = stringify(params);
	return fetch(`${url}?${query}`);
}

export async function post (url, params = {}) {
	return fetch(url, {
		method: 'POST',
		// body: JSON.stringify(params)
		body: asFormData(params)
	});
}

function asFormData (data) {
	const f = new FormData();
	for (const key of Object.keys(data)) {
		f.append(key, data[key]);
	}
	return f;
}
