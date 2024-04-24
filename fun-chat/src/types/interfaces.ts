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

export interface MessageData {
    id: string,
    from: string,
    to: string,
    text: string,
    datetime: number,
    status: {
        isDelivered: boolean,
        isReaded: boolean,
        isEdited: boolean,
    }
}

export interface MessageStatus {
    id: string,
    status: {isDelivered: boolean} | {isReaded: boolean} | {isDeleted: boolean}
}

export interface UserResponse {
    id: string,
    type: string,
    payload: UserData | {user: UserLogin} | PayloadUserList | {error: string} | {message: MessageData} | {message: MessageStatus} | {messages: MessageData[]}
}