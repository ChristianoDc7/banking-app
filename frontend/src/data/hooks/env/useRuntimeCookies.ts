import _ from "lodash";
import Cookies from "js-cookie";
import { TUser } from "../../../types/User";
import { RUNTIME_COOKIE_KEYS } from "../../services/AuthCookies";

export const useRuntimeCookies = () => {
    const cookies = Cookies.get(RUNTIME_COOKIE_KEYS);
    return {
        env: !!cookies ? JSON.parse(cookies!) as TUser : null,
        setEnv:(data: any)=> Cookies.set(RUNTIME_COOKIE_KEYS, JSON.stringify(_.omit(data, "token")), {path:"/"}),
        deleteEnv:()=> Cookies.remove(RUNTIME_COOKIE_KEYS)
    }
}
