interface PayloadUser {
    user: {
        login: string,
        password: string,
    }
}

export interface UserRequest {
    id: string,
    type: string,
    payload: PayloadUser
}