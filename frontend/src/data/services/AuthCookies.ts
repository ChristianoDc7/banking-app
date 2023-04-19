import Cookies from 'js-cookie'

export function setTokenCookie(value: string) {
	Cookies.set(TOKEN_COOKIE_KEYS, value, { httpOnly: true, path: "/" });
}

export function getTokenCookie() {
	return Cookies.get(TOKEN_COOKIE_KEYS)
}

export function deleteTokenCookie() {
	Cookies.remove(TOKEN_COOKIE_KEYS);
}

export const RUNTIME_COOKIE_KEYS = "User.env.Cookies"
export const TOKEN_COOKIE_KEYS = "User.token.Cookies"

