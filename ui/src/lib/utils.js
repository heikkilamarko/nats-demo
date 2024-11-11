import { v4 as uuidv4 } from 'uuid';

export function getWsUrl(url) {
	return url?.startsWith('ws')
		? url
		: `${location.origin.replace(/^http/, 'ws')}/${url.replace(/^\//, '')}`;
}

export function setSessionToken(token) {
	localStorage.setItem('token', token);
}

export function getSessionToken() {
	return localStorage.getItem('token');
}

export function createMessageId() {
	return uuidv4();
}
