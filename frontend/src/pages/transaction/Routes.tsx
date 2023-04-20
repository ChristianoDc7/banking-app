import React from "react";
import { RouteProps } from "../../config/Route";
import { PageRoutes } from "../../config/PageRoutes";

const TransactionList = React.lazy(() => import("./TransactionDashboard"));

const Routes :  RouteProps[] = [
    {
        path: PageRoutes.TRANSACTIONS,
        element : <TransactionList />,
    }
]

export default Routes