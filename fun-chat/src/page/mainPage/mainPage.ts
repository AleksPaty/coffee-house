import { Api } from '../../api/api';
import { ChatField } from '../../components/chatField';
import { MainFooter } from '../../components/mainFooter';
import { MainHeader } from '../../components/mainHeader';
import { makeMessageMenu } from '../../components/messageElem';
import { UserList } from '../../components/userList';
import { ElemConstruct } from '../../utils/elemConstruct';

export class MainPage {
    userList = new UserList();
    userChat = new ChatField();
    headerBlock = new MainHeader();
    footerBlock = new MainFooter();
    user = { login: '', password: '', isLogined: false };

    private makeWrap(): HTMLElement {
        const wrapper = ElemConstruct('div', 'main-wrap');
        return wrapper;
    }

    private chooseUserHandle(e: Event, func: (userName: string) => void): void {
        const targetElem = e.target as HTMLElement;
        if (targetElem.tagName === 'LI') {
            const name = targetElem.getAttribute('name');
            const status = targetElem.className.split(' ').at(-1);

            this.userChat.makeCurrentUserField(name!, status!);
            this.userChat.chatingForm?.classList.remove('hide');
            this.userChat.container.dataset.name = name!;

            func(name!);
        }
    }

    private sendMessageHandle(e: Event, sendFunc: (toUser: string, message: string) => void): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const messageInput = form.firstElementChild?.lastChild as HTMLInputElement;
        const recipient = form.parentElement!.dataset.name;

        sendFunc(recipient!, messageInput.value);
        messageInput.value = '';
    }

    private changeReadStatusHandle(e: Event, callback: (messageId: string) => void): void {
        const chatBlock = e.target as HTMLElement;
        const separateLine = document.getElementById('separate-line');
        if (!separateLine) return;
        if (e.type === 'scroll') {
            const toEnd = Math.floor(chatBlock.scrollHeight - chatBlock.scrollTop);
            if (toEnd - chatBlock.clientHeight < 2) {
                this.changeReadStatus(chatBlock, callback);
            }
        }
        if (e.type === 'click' && chatBlock.scrollTop === 0) {
            this.changeReadStatus(chatBlock, callback);
        }
    }

    private changeReadStatus(chatBlock: HTMLElement, callback: (messageId: string) => void): void {
        const messageList = [...chatBlock.children];
        if (messageList.length < 2) return;
        for (let i = messageList.length - 1; i >= 0; i -= 1) {
            if (messageList[i].classList.contains('right')) return;

            const messageId = messageList[i].id;
            if (messageId.includes('message')) callback(messageId.slice(8));
            if (!messageId.includes('message')) {
                messageList[i].remove();
                break;
            }
        }
        const userName = chatBlock.parentElement?.dataset.name;
        this.userList.removeUnreadMessageCount(userName!);
    }

    private makeChatBlock(): HTMLElement {
        const chatElem = ElemConstruct('div', 'main-chat');
        chatElem.append(this.userList.render(), this.userChat.render());

        return chatElem;
    }

    private chatClickHandle(
        e: MouseEvent,
        changeStatus: (messageId: string) => void,
        deleteMsg: (messageId: string) => void
    ) {
        const chat = e.currentTarget as HTMLElement;
        this.changeReadStatusHandle(e, changeStatus);
        const messageMenu = chat.querySelector('.message-menu');

        if (!messageMenu) {
            makeMessageMenu(e, deleteMsg);
        } else {
            messageMenu.remove();
        }
    }

    private addHandles(api: Api) {
        this.userList.userList.onclick = (e) => this.chooseUserHandle.bind(this)(e, api.getMessageHistory.bind(api));
        this.userChat.chatingForm!.onsubmit = (e) => this.sendMessageHandle.bind(this)(e, api.sendMessage.bind(api));
        this.userChat.messagesField!.onscroll = (e) => {
            this.changeReadStatusHandle.bind(this)(e, api.readStatusChange.bind(api));
        };
        this.userChat.messagesField!.onclick = (e) => {
            this.chatClickHandle.bind(this)(e, api.readStatusChange.bind(api), api.deleteMessage.bind(api));
        };
    }

    public render(api: Api): HTMLElement {
        const wrapper = this.makeWrap();

        wrapper.append(
            this.headerBlock.render(this.user, api.userOperation.bind(api)),
            this.makeChatBlock(),
            this.footerBlock.render()
        );
        this.addHandles(api);
        return wrapper;
    }
}
