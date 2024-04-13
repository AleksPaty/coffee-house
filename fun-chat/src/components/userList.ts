import { ElemConstruct } from '../utils/elemConstruct';

export class UserList {
    public makeListUser() {
        const wrap = ElemConstruct('div', 'main-chat_list');

        return wrap;
    }
}
