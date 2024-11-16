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

let messageId = 1;
export function createMessageId() {
	return messageId++;
}
