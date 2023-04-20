import { useEffect } from "react"
import { useRuntimeCookies } from "../../data/hooks/env/useRuntimeCookies"
import { deleteTokenCookie } from "../../data/services/AuthCookies"
import { PageRoutes } from "../../config/PageRoutes"

const Logout = () => {

    const {deleteEnv} = useRuntimeCookies()
    
    useEffect(() => {
        deleteTokenCookie()
        deleteEnv()
        window.location.href = PageRoutes.LOGIN
    }, [])

    return (
        <></>
    )
}

export default Logout