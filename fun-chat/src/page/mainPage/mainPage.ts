import { ChatField } from '../../components/chatField';
import { UserList } from '../../components/userList';
import { ElemConstruct } from '../../utils/elemConstruct';
import { removeDataUser } from '../../utils/storageUtils';

export class MainPage {
    userList = new UserList();
    userChat = new ChatField();
    user = { login: '', password: '', isLogined: false };

    private makeWrap(): HTMLElement {
        const wrapper = ElemConstruct('div', 'main-wrap');
        return wrapper;
    }

    private makeHeaderElems(
        userName: string,
        logOutFunc: (operationType: string, userName: string, word: string) => void
    ): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const userBlock = ElemConstruct('div', 'main-header_user', `User: ${userName}`);
        const controlBlock = ElemConstruct('div', 'main-header_control');
        const logoutBtn = ElemConstruct('button', 'main-header_logout', 'LogOut');
        logoutBtn.onclick = () => {
            removeDataUser();
            logOutFunc('USER_LOGOUT', this.user.login, this.user.password);
        };

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
        chatElem.append(this.userList.render(), this.userChat.render());

        return chatElem;
    }

    private makeFooterElems(): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const gHLink = ElemConstruct('a', 'gh-link', 'My Github', undefined, [
            { href: 'https://github.com/AleksPaty' },
        ]);
        const about = ElemConstruct('p', 'about', 'Thank you for your attention. 2024 ©');
        const rsSchool = ElemConstruct('p', 're-school', 'RSSchool');
        fragment.append(gHLink, about, rsSchool);
        return fragment;
    }

    public render(
        userName: string,
        logOutFunc: (operationType: string, userName: string, word: string) => void
    ): HTMLElement {
        const header = ElemConstruct('div', 'main-header');
        const footer = ElemConstruct('div', 'main-footer');
        const wrapper = this.makeWrap();

        header.append(this.makeHeaderElems(userName, logOutFunc));
        footer.append(this.makeFooterElems());
        wrapper.append(header, this.makeChatBlock(), footer);
        return wrapper;
    }
}
