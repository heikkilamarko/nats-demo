export function getWsUrl(url) {
	return url?.startsWith('ws')
		? url
		: `${location.origin.replace(/^http/, 'ws')}/${url.replace(/^\//, '')}`;
}
