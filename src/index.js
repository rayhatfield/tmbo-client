import {resolve} from 'url';

import {version, homepage} from '../package.json';
import {get, post} from './requests';
import Storage from './storage';

const AUTH_TOKEN = 'auth-token';

export default class TmboClient {
	constructor ({endpoint}) {
		this.endpoint = endpoint;
		this.version = version;
		this.homepage = homepage;
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

	resolve = (path) => {
		return resolve(this.endpoint, path);
	}

	async loadImages () {
		return this.getUploads({
			type: 'image'
		});
	}

	async loadDiscussions () {
		return this.getUploads({
			type: 'topic'
		});
	}

	async getUnread () {
		return this.get('unreadcomments.json')
		.then( response => response.json() );
	}

	async getUpload (fileid) {
		return this.get('getupload.json', {
			fileid
		})
		.then( response => response.json() );
	}

	async getAdjacent (fileid, previous) {
		if (typeof fileid !== 'number') {
			throw Error('fileid must be a number');
		}

		const args = Object.assign({
			type: 'image',
			limit: 1
		}, previous ? { max: fileid - 1} : { since: fileid + 1 });

		return this.get('getuploads.json', args)
		.then( response => response.json() );
	}

	async getUploads ({type = 'image'}) {
		return this.get('getuploads.json', {
			type
		})
		.then( response => response.json() );
	}

	async getComments (thread) {
		return this.get('getcomments.json', {
			thread
		})
		.then( response => response.json() );
	}

	async postComment (fileid, comment) {
		return this.post('postcomment.json', {
			fileid,
			comment
		})
		.then( response => response.json() );
	}

	async getUser (userid) {
		return this.get('getuser.json', {
			userid
		})
		.then( response => response.json() );
	}

	async getCurrentUser () {
		const token = Storage.get(AUTH_TOKEN);
		if (!token) {
			return Promise.reject('No auth token');
		}
		return this.get('getuser.json')
			.then(response => response.json());
	}

	async login (username, password) {
		const response = await this.post('login.json', {
			username,
			password,
			gettoken: 1
		});

		if (response.ok) {
			return response.json()
				.then(json => {
					Storage.set(AUTH_TOKEN, json.tokenid);
					return json;
				});
		}

		return response;
	}

	logout () {
		Storage.remove(AUTH_TOKEN);
	}
}
