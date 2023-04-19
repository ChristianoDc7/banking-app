import React from "react";
import { RouteProps } from "../../config/Route";
import { PageRoutes } from "../../config/PageRoutes";
import Logout from "./Logout";

const Login = React.lazy(() => import("./Login"));

const Routes :  RouteProps[] = [
    {
        path: PageRoutes.LOGIN,
        element : <Login />
    },
    {
        path: PageRoutes.LOGOUT,
        element : <Logout />
    }
]

export default Routes