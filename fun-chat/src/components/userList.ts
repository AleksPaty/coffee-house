import { UserLogin } from '../types/interfaces';
import { ElemConstruct } from '../utils/elemConstruct';

export class UserList {
    listContainer: HTMLElement;

    constructor() {
        this.listContainer = ElemConstruct('div', 'main-chat_list-wrap');
    }

    public addUsers(currentUser: string, users: UserLogin[]) {
        const list = this.listContainer.querySelector('.main-chat_list');
        if (users.length) {
            users.forEach((user, i) => {
                if (currentUser !== user.login) {
                    if (!list?.children[i] || list?.children[i].innerHTML !== user.login) {
                        const status = user.isLogined ? 'online' : 'offline';
                        const li = ElemConstruct('li', 'main-chat_list-item', `${user.login}`, undefined, [
                            { name: `${user.login}` },
                        ]);
                        li.classList.add(status);
                        list?.append(li);
                    }
                }
            });
        }
    }

    public changeStatus(user: string, status: boolean): void {
        const usersList = this.listContainer.children[1];
        const userElem = usersList.children.namedItem(user);
        if (status) {
            userElem?.classList.remove('offline');
            userElem?.classList.add('online');
            if (userElem) {
                usersList.prepend(userElem.cloneNode(true));
                userElem?.remove();
            }
        } else {
            userElem?.classList.remove('online');
            userElem?.classList.add('offline');
        }
    }

    private inputAdd(): HTMLElement {
        const wrapper = ElemConstruct('div', 'main-chat_find-wrap');
        ElemConstruct('input', 'main-chat_find-Input', undefined, wrapper, [
            { type: 'text' },
            { placeholder: 'Search..' },
        ]);
        return wrapper;
    }

    public render() {
        const list = ElemConstruct('ul', 'main-chat_list');
        if (this.listContainer.children.length < 1) this.listContainer.append(this.inputAdd(), list);
        return this.listContainer;
    }
}
