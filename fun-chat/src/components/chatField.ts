import { ElemConstruct } from '../utils/elemConstruct';

export class ChatField {
    container: HTMLElement;

    constructor() {
        this.container = ElemConstruct('div', 'main-chat_field');
    }

    public render(): HTMLElement {
        return this.container;
    }
}
