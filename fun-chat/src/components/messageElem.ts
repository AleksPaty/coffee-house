import { MessageData, MessageStatus } from '../types/interfaces';
import { ElemConstruct } from '../utils/elemConstruct';

export const makeMessage = (message: MessageData, friend: string): HTMLElement => {
    const date = new Date(message.datetime);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minuts = `${date.getMinutes()}`.padStart(2, '0');
    const timeString = `${day}.${month}.${date.getFullYear()} ${hour}:${minuts}`;
    const status = message.status.isDelivered ? 'delivered' : 'send';

    const messageWrap = ElemConstruct('div', `message-item ${message.from === friend ? 'left' : 'right'}`);
    messageWrap.id = `message-${message.id}`;
    const messageHeader = ElemConstruct('div', 'message-item__head');
    ElemConstruct(
        'p',
        'message-item__head_userName',
        `${message.from === friend ? message.from : 'you'}`,
        messageHeader
    );
    ElemConstruct('p', 'message-item__head_data', `${timeString}`, messageHeader);

    const messageBody = ElemConstruct('div', `message-item__body`);
    ElemConstruct('p', 'main-chat_field-messageItemText', `${message.text}`, messageBody);
    const messageFooter = ElemConstruct('div', 'message-item__footer');

    messageWrap.append(messageHeader, messageBody);

    if (message.from !== friend) {
        ElemConstruct('p', 'message-item__footerEdited', '', messageFooter);
        ElemConstruct(
            'p',
            'message-item__footerStatus',
            `${!message.status.isReaded ? status : 'readed'}`,
            messageFooter
        );
        messageWrap.append(messageFooter);
    }
    return messageWrap;
};

export const changeMessageStatus = (messageStatus: MessageStatus): void => {
    const targetMessage = document.getElementById(`message-${messageStatus.id}`);
    if (targetMessage?.classList.contains('right')) {
        const targetMessageStatusElem = targetMessage?.lastElementChild?.lastElementChild as HTMLElement;
        const status = Object.keys(messageStatus.status as { isDelivered: boolean } | { isReaded: boolean }).at(0)!;
        targetMessageStatusElem.innerText = `${status.slice(2)}`.toLowerCase();
    }
};
