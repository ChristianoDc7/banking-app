export type LoginPayload = {
    username: string
    password: string
}

export type TUser = {
    id?: number
    username?: string
    role?: number
    password?: string
    amount?: number;
}

export type TLoginReturn = TUser & {
    token?: string
}