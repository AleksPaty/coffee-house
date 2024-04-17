export interface UserData {
    user: {
        login: string,
        password: string,
    }
}
export interface UserLogin {
    login: string,
    isLogined: boolean,
}

export interface PayloadUserList {
    users: UserLogin[]
}

export interface UserRequest {
    id: string,
    type: string,
    payload: UserData | {user: UserLogin} | PayloadUserList
}