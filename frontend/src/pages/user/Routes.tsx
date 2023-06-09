import React from "react";
import { RouteProps } from "../../config/Route";
import { PageRoutes } from "../../config/PageRoutes";

const Users = React.lazy(() => import("./UserList"));

const Routes :  RouteProps[] = [
    {
        path: PageRoutes.USERS,
        element : <Users/>,
    }
]

export default Routes