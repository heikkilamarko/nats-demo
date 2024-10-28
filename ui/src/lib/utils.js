export function getWsUrl(url) {
	return url?.startsWith('ws')
		? url
		: `${location.origin.replace(/^http/, 'ws')}/${url.replace(/^\//, '')}`;
}

export function formatMessage(message) {
	try {
		return JSON.stringify(message, null, 2);
	} catch {}
	return message;
}

export function setSessionToken(token) {
	sessionStorage.setItem('token', token);
}

export function getSessionToken() {
	return sessionStorage.getItem('token');
}
