import { MessageData, UserLogin } from '../types/interfaces';
import { ElemConstruct } from '../utils/elemConstruct';

export class UserList {
    listContainer: HTMLElement;
    userList: HTMLElement;

    constructor() {
        this.listContainer = ElemConstruct('div', 'main-chat_list-wrap');
        this.userList = ElemConstruct('ul', 'main-chat_list');
    }

    public addUsers(currentUser: string, users: UserLogin[], getHistoryMessage?: (userName: string) => void) {
        const list = this.userList;
        if (users.length) {
            users.forEach((user, i) => {
                if (currentUser !== user.login) {
                    if (getHistoryMessage) getHistoryMessage(user.login);
                    if (!list?.children[i] || list?.children[i].innerHTML !== user.login) {
                        const status = user.isLogined ? 'online' : 'offline';
                        const li = ElemConstruct('li', 'main-chat_list-item', `${user.login}`, undefined, [
                            { name: `${user.login}` },
                        ]);
                        li.classList.add(status);
                        this.userList.append(li);
                    }
                }
            });
        }
    }

    public changeStatus(user: string, status: boolean): void {
        const userElem = this.userList.children.namedItem(user);
        if (!userElem) {
            this.addUsers('other', [{ login: user, isLogined: status }]);
            return;
        }
        if (userElem && status) {
            userElem?.classList.remove('offline');
            userElem?.classList.add('online');
            if (userElem) {
                this.userList.prepend(userElem.cloneNode(true));
                userElem?.remove();
            }
        } else {
            userElem?.classList.remove('online');
            userElem?.classList.add('offline');
        }
    }

    public showUnreadMessageCount(ownUser: string, messages: MessageData[]): void {
        let friendUserElem: HTMLElement | null = null;
        let count = 0;
        messages.forEach((message) => {
            if (message.from !== ownUser) {
                if (!friendUserElem) friendUserElem = this.userList.children.namedItem(message.from) as HTMLElement;
                if (!message.status.isReaded) count += 1;
            }
        });
        if (count > 0) {
            ElemConstruct('div', 'newMessages-count', `${count}`, friendUserElem!);
        }
    }

    public removeUnreadMessageCount(friendUser: string): void {
        const userElem = this.userList.children.namedItem(friendUser);
        userElem!.lastElementChild?.remove();
    }

    private makeFindInput(): HTMLElement {
        const wrapper = ElemConstruct('div', 'main-chat_find-wrap');
        const inputElem = ElemConstruct('input', 'main-chat_find-Input', undefined, wrapper, [
            { type: 'text' },
            { placeholder: 'Search..' },
        ]);
        inputElem.oninput = (e: Event) => {
            const input = e.target as HTMLInputElement;
            const userList = [...this.userList.children];
            if (input.value.length > 0) {
                userList.forEach((user) => {
                    const userName = (user as HTMLElement).innerText.toLowerCase();
                    if (!userName.includes(input.value.toLowerCase())) user.classList.add('hide');
                    if (userName.includes(input.value.toLowerCase())) user.classList.remove('hide');
                });
            } else {
                userList.forEach((user) => user.classList.remove('hide'));
            }
        };

        return wrapper;
    }

    public render() {
        if (this.listContainer.children.length < 1) {
            this.listContainer.append(this.makeFindInput(), this.userList);
        }
        return this.listContainer;
    }
}
