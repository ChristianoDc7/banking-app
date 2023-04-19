import React from "react";
import { RouteProps } from "../../config/Route";
import { PageRoutes } from "../../config/PageRoutes";

const Dashboard = React.lazy(() => import("./Home"));

const Routes :  RouteProps[] = [
    {
        path: PageRoutes.DASHBOARD,
        element : <Dashboard/>,
    }
]

export default Routes