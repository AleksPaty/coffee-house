import { UserRequest } from '../types/interfaces';

export class Api {
    connection: WebSocket;

    constructor(url = 'ws://127.0.0.1:4000') {
        this.connection = new WebSocket(url);
    }

    public userOperation(operationType: string, userName: string, word: string) {
        const id = operationType.includes('IN') ? `login_${userName}` : `logout_${userName}`;
        const data: UserRequest = {
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
    }
}
