

export const LoginRoutes = "/login";
export const UserRoutes = "/users";
export const OneUserRoutes = "/user";
export const OneUserIdRoutes = OneUserRoutes+"/:id";

export const checkPasswordRoute = "/checkPassword";

export const TransactionRoutes = "/transactions";
export const TransactionRoute = "/transaction";

export const AdminRoutes = [OneUserRoutes, OneUserIdRoutes];
export const OwnerUserRoutes = [OneUserRoutes];
export const PublicRoutes = [UserRoutes, checkPasswordRoute];
export const OwnerAccountRoutes = [TransactionRoute, TransactionRoutes];