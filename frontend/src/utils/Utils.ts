import _ from "lodash"
import { useRuntimeCookies } from "../data/hooks/env/useRuntimeCookies"
import Cookies from "js-cookie"
import { RUNTIME_COOKIE_KEYS, deleteTokenCookie } from "../data/services/AuthCookies"
import { TTransaction } from "../types/Transaction"

export function RedirectHard(url: string) {
    window.location.href = url
}

export function isLoggedIn() {
    const { env } = useRuntimeCookies()
    return !_.isEmpty(env)
}

export const isAdmin = () => {
    const { env } = useRuntimeCookies()
    return env?.role === 1
}

export function logout() {
    Cookies.remove(RUNTIME_COOKIE_KEYS)
    deleteTokenCookie();
}

function calculerMontants(nomUtilisateur: string, transactions: TTransaction[]) {
    return transactions?.reduce((montants: any, transaction) => {
        const { senderName, receiverName, amount } = transaction;
        if (senderName === nomUtilisateur) {
            montants[nomUtilisateur] = (montants[nomUtilisateur] || 0) - (amount || 0);
        }
        if (receiverName === nomUtilisateur) {
            montants[nomUtilisateur] = (montants[nomUtilisateur] || 0) + amount;
        }
        return montants;
    }, {});
}