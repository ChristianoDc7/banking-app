import React from "react";
import { RouteProps } from "../../config/Route";
import { PageRoutes } from "../../config/PageRoutes";

const TransactionList = React.lazy(() => import("./TransactionDashboard"));
const TransactionTransfer = React.lazy(() => import("./Transfer"));

const Routes :  RouteProps[] = [
    {
        path: PageRoutes.TRANSACTIONS,
        element : <TransactionList />,
    },
    {
        path: PageRoutes.WITHDRAW,
        element : <TransactionTransfer />,
    }
]

export default Routes