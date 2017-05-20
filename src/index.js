import {version} from '../package.json';
import {get, post} from './requests';
import Storage from './storage';

const AUTH_TOKEN = 'auth-token';

export default class TmboClient {
	constructor ({endpoint}) {
		this.endpoint = endpoint;
		this.version = version;
	}

	get = (path, params) => {
		const token = Storage.get(AUTH_TOKEN);
		return get(`${this.endpoint}${path}`, {
			token,
			...params
		});
	}

	post = (path, params) => {
		const token = Storage.get(AUTH_TOKEN);
		return post(`${this.endpoint}${path}`, {
			token,
			...params
		});
	}

	async login (username, password) {
		const result = await this.post('login.json', {
			username,
			password,
			gettoken: 1
		});
		Storage.set(AUTH_TOKEN, result.tokenid);
		return result;
	}
}
