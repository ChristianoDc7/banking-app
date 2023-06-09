export const PageRoutes = {
    HOME: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    WITHDRAW: "/withdraw",
    USERS: "/users",
    TRANSACTIONS: "/transactions",
    LOGOUT: "/logout"
}

export const AdminRoutes = [PageRoutes.USERS];
export const LoggedInRoutes = [PageRoutes.DASHBOARD, PageRoutes.PROFILE, PageRoutes.TRANSACTIONS, PageRoutes.USERS, PageRoutes.HOME];