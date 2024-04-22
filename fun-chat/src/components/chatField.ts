import { MessageData } from '../types/interfaces';
import { ElemConstruct } from '../utils/elemConstruct';
import { makeMessage } from './messageElem';

export class ChatField {
    container: HTMLElement;
    messagesField: HTMLElement | undefined;
    chatingForm: HTMLFormElement | undefined;

    constructor() {
        this.container = ElemConstruct('div', 'main-chat_field');
    }

    public makeCurrentUserField(userName: string, status: string): void {
        const hasUserBlock = this.container.firstElementChild!.className === 'main-chat_field-chatUser';
        if (!hasUserBlock) {
            const userBlock = ElemConstruct('div', 'main-chat_field-chatUser');
            ElemConstruct('p', `main-chat_field-userName ${status}`, userName, userBlock);
            ElemConstruct('p', `main-chat_field-userStat ${status}`, status, userBlock);
            this.container.prepend(userBlock);
            return;
        }
        if (hasUserBlock) {
            const userBlock = this.container.firstElementChild;
            const userNameElem = userBlock?.firstElementChild as HTMLElement;
            const statusElem = userBlock?.lastElementChild as HTMLElement;
            if (userNameElem.innerText !== userName) userNameElem.innerText = userName;
            if (statusElem.innerText !== status) statusElem.innerText = status;
        }
    }

    private makeMessagesField(): void {
        const messagesBlock = ElemConstruct('div', 'main-chat_field-messagesWrap');
        ElemConstruct('div', 'main-chat_field-startMessage', 'Select a user for communication', messagesBlock);
        this.container.append(messagesBlock);

        this.messagesField = messagesBlock;
    }

    public addOldMessages(messages: MessageData[]): void {
        if (messages.length < 1) {
            const emptyMessageElem = this.messagesField?.firstChild as HTMLElement;
            emptyMessageElem.innerText = 'Message history is empty';
        } else {
            this.messagesField?.replaceChildren();
            const fragment = document.createDocumentFragment();
            const friendName = this.container.dataset.name;
            let isRead = true;

            messages.forEach((item) => {
                if (item.from === friendName && !item.status.isReaded && isRead) {
                    fragment.append(ElemConstruct('div', 'separate-line', 'New messages'));
                    isRead = false;
                }
                const message = makeMessage(item, friendName!);
                fragment.append(message);
            });

            this.messagesField?.append(fragment);
        }
    }

    public addRemoveSeparateLine(order: 'add' | 'remove'): HTMLElement | null {
        const line = ElemConstruct('div', 'separate-line', 'New messages');
        line.id = 'separate-line';
        if (order === 'add') return line;
        if (order === 'remove') this.messagesField?.removeChild(line);
        return null;
    }

    public addNewMessage(messageData: MessageData, friend: string) {
        const separateLine = this.addRemoveSeparateLine('add')!;
        const message = makeMessage(messageData, friend);
        if (!this.messagesField?.contains(separateLine) && messageData.from === friend) {
            this.messagesField?.append(separateLine, message);
        } else {
            this.messagesField?.append(message);
        }
    }

    private makeEnteringBlock(): void {
        const chatingForm = ElemConstruct('form', 'main-chat_field-entryWrap hide');
        const inpWrapper = ElemConstruct('div', 'main-chat_field-inputWrap');
        ElemConstruct('input', 'main-chat_field-entryInput', undefined, inpWrapper, [
            { type: 'text' },
            { placeholder: 'Message..' },
        ]);
        const buttonElem = ElemConstruct('button', 'main-chat_field-entryBtn', 'Send', undefined, [{ type: 'submit' }]);

        chatingForm.append(inpWrapper, buttonElem);
        this.container.append(chatingForm);
        this.chatingForm = chatingForm as HTMLFormElement;
    }

    public render(): HTMLElement {
        if (this.container.children.length < 1) {
            this.makeMessagesField();
            this.makeEnteringBlock();
        }
        return this.container;
    }
}
