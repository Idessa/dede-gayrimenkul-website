import { createDirectus, rest, type FetchInterface } from '@directus/sdk';
import { authentication } from '@directus/sdk';

export function getDirectusInstance(fetch?: FetchInterface, token?: string) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus('https://energydnd.idesamedya.com/', options)
		.with(authentication('json'))
		.with(rest());
	if (token) directus.setToken(token);
	return directus;
}

export const constructCookieOpts = (age: number) => {
	return {
		domain: 'localhost',
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a given time
		maxAge: age
	} as {
		path: string;
		httpOnly: boolean;
		sameSite: boolean | 'strict' | 'lax' | 'none' | undefined;
		maxAge: number;
	};
};

export default getDirectusInstance;
