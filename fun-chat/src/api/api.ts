import { UserResponse } from '../types/interfaces';

export class Api {
    connection: WebSocket;

    constructor(url = 'ws://127.0.0.1:4000') {
        this.connection = new WebSocket(url);
    }

    public userOperation(operationType: string, userName: string, word: string): void {
        const id = operationType.includes('IN') ? `login_${userName}` : `logout_${userName}`;
        const data: UserResponse = {
            id,
            type: operationType,
            payload: {
                user: {
                    login: userName,
                    password: word,
                },
            },
        };

        const stringData = JSON.stringify(data);
        this.connection.send(stringData);
        this.connection.onerror = (e) => {
            console.log(e);
        };
    }

    public getAllUsers(): void {
        const userActive = 'USER_ACTIVE';
        const userInactive = 'USER_INACTIVE';

        this.connection.send(
            JSON.stringify({
                id: `get${userActive.slice(4)}`,
                type: userActive,
                payload: null,
            })
        );
        this.connection.send(
            JSON.stringify({
                id: `get${userInactive.slice(4)}`,
                type: userInactive,
                payload: null,
            })
        );
    }

    public getMessageHistory(userName: string): void {
        const sendData = {
            id: 'getMessageHist',
            type: 'MSG_FROM_USER',
            payload: {
                user: {
                    login: userName,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }

    public sendMessage(toUser: string, message: string): void {
        const sendData = {
            id: 'sendingMessage',
            type: 'MSG_SEND',
            payload: {
                message: {
                    to: toUser,
                    text: message,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }

    public readStatusChange(messageId: string): void {
        const sendData = {
            id: 'readStatusAdd',
            type: 'MSG_READ',
            payload: {
                message: {
                    id: messageId,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }
}
