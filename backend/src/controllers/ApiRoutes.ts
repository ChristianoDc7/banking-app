

export const LoginRoutes = "/login";
export const UserRoutes = "/users";
export const OneUserRoutes = "/user";
export const OneUserIdRoutes = OneUserRoutes+"/:id";

export const TransactionRoutes = "/transactions";
export const TransactionRoute = "/transaction";

export const AdminRoutes = [UserRoutes, TransactionRoutes, OneUserRoutes, OneUserIdRoutes];
export const OwnerUserRoutes = [OneUserIdRoutes, OneUserRoutes];
export const OwnerAccountRoutes = [TransactionRoute, TransactionRoutes];