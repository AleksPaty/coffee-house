import { UserList } from '../../components/userList';
import { ElemConstruct } from '../../utils/elemConstruct';

export class MainPage {
    userList = new UserList();

    private makeWrap(): HTMLElement {
        const wrapper = ElemConstruct('div', 'main-wrap');

        return wrapper;
    }

    private makeHeaderElems(userName: string): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const userBlock = ElemConstruct('div', 'main-header_user', `User: ${userName}`);
        const controlBlock = ElemConstruct('div', 'main-header_control');
        const logoutBtn = ElemConstruct('button', 'main-header_logout', 'LogOut');
        controlBlock.append(
            ElemConstruct('h1', 'main-header_title', 'Fun chat'),
            ElemConstruct('button', 'main-header_info', 'Info'),
            logoutBtn
        );

        fragment.append(userBlock, controlBlock);
        return fragment;
    }

    private makeChatBlock() {
        const chatElem = ElemConstruct('div', 'main-chat');
        chatElem.append(this.userList.makeListUser());

        return chatElem;
    }

    public render() {
        const header = ElemConstruct('div', 'main-header');
        header.append(this.makeHeaderElems('Вася'), this.makeChatBlock());
        this.makeWrap();
    }
}
