import React, { useCallback, useMemo } from 'react'
import { RedirectHard, isAdmin, isLoggedIn } from '../utils/Utils';
import { matchPath, useNavigate } from 'react-router-dom';
import { AdminRoutes, LoggedInRoutes, PageRoutes } from './PageRoutes';
import { useRuntimeCookies } from '../data/hooks/env/useRuntimeCookies';

export const useRedirections = () => {
    const path = useMemo(() => window.location.pathname, [window.location.pathname])
    const {env} = useRuntimeCookies()

    const checkAutorizedRoute = (_path:string) => {

        if (!isLoggedIn() && !isRouteAuthorized(_path) && _path !== PageRoutes.LOGOUT) {
            if (_path !== PageRoutes.LOGIN) {
                RedirectHard(`${PageRoutes.LOGIN}?redirectUrl=${location.pathname}`)
            }
            return;
        }

        if (!isRouteAuthorized(_path)) {
            if(isLoggedIn()){
                RedirectHard(PageRoutes.DASHBOARD)
                return
            }
            RedirectHard(PageRoutes.LOGIN)
            return;
        }
    }

    const isRouteAuthorized = (_path: string) => {
        if (LoggedInRoutes?.some((item) => matchPath?.(item, _path)) && !isLoggedIn()) {
            return false
        }

        if (isLoggedIn() && path === PageRoutes.LOGIN) {
            return false
        }

        if(isLoggedIn() && !isAdmin() && AdminRoutes?.some((item) => matchPath?.(item, _path))) return false
        return true
    }

    return {
        checkAutorizedRoute
    }
}
