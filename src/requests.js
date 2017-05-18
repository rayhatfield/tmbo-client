import qs from 'query-string';

const endpoint = 'https://thismight.be/offensive/api.php/';

export const get = (path, params = {}) => {
	return request(path, params);
};

function request (path, params = {}, method = 'GET') {
	const query = qs.stringify(params);
	return fetch(`${endpoint}${path}?${query}`, {
		method,
	})
	.then(response => {
		console.log(response.ok);
		console.log(response.json());
		return response.json();
	});
}
