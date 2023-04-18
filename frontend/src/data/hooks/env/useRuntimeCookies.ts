import _ from "lodash";
import { useCookies } from "react-cookie";
import { TUser } from "../../../types/User";
import { RUNTIME_COOKIE_KEYS } from "../../services/CookieKeys";

export const useRuntimeCookies = () => {
    const [cookies, setCookies, removeCookie] = useCookies([RUNTIME_COOKIE_KEYS]);
    return {
        env: _.omit(cookies[RUNTIME_COOKIE_KEYS], "token") as TUser,
        setEnv:(data: any)=> setCookies(RUNTIME_COOKIE_KEYS, JSON.stringify(data), {path:"/"}),
        deleteEnv:()=> removeCookie(RUNTIME_COOKIE_KEYS)
    }
}
