import { useRoutes } from "react-router";
import { RouteObject } from "react-router";

export const Routes = ({ routes }: { routes: RouteProps[] }) => useRoutes(routes)

export type RouteProps = RouteObject & {
    children?: RouteProps[]
}