import React from "react";
import { RouteProps } from "../../config/Route";

const Login = React.lazy(() => import("./Login"));

const Routes :  RouteProps[] = [
    {
        path: "/login",
        element : <Login />,
    }
]

export default Routes