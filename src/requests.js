import {stringify} from 'query-string';

export async function get (url, params = {}) {
	const query = stringify(params);
	const result = await fetch(`${url}?${query}`);
	if (result.ok) {
		const json = await result.json();
		console.log(json);
		return json;
	}
	throw new Error;
}

export async function post (url, params = {}) {
	const result = await fetch(url, {
		method: 'POST',
		// body: JSON.stringify(params)
		body: asFormData(params)
	});

	if (result.ok) {
		const json = await result.json();
		console.log(json);
		return json;
	}
}

function asFormData (data) {
	const f = new FormData();
	for (const key of Object.keys(data)) {
		f.append(key, data[key]);
	}
	return f;
}
