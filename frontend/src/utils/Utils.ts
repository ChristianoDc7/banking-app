import _ from "lodash"
import { useRuntimeCookies } from "../data/hooks/env/useRuntimeCookies"
import Cookies from "js-cookie"
import { RUNTIME_COOKIE_KEYS, deleteTokenCookie } from "../data/services/AuthCookies"

export function RedirectHard(url: string){
    window.location.href = url
}

export function isLoggedIn(){
    const {env} = useRuntimeCookies()
    return !_.isEmpty(env)
}

export const isAdmin = () => {
    const {env} = useRuntimeCookies()
    return env.role === 1
}

export function logout(){
    Cookies.remove(RUNTIME_COOKIE_KEYS)
    deleteTokenCookie();
}