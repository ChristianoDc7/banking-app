import React from "react";
import { RouteProps } from "../../config/Route";

const Dashboard = React.lazy(() => import("./Home"));

const Routes :  RouteProps[] = [
    {
        path: "/dashboard",
        element : <Dashboard/>,
    }
]

export default Routes