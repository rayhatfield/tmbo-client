import {get} from './requests';

export default function login (username, password) {
	return get('login.json', {
		username,
		password,
		getoken: 1
	});
}
