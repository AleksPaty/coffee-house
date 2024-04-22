import { ElemConstruct } from '../utils/elemConstruct';
import { removeDataUser } from '../utils/storageUtils';

export class MainHeader {
    private makeUserNameElem(userName: string) {
        const userElem = ElemConstruct('div', 'main-header_user', `User: ${userName}`);
        return userElem;
    }

    private makeBtnsElem(
        userName: string,
        pass: string,
        logOutHandle: (operationType: string, userName: string, word: string) => void | null
    ) {
        const controlBlock = ElemConstruct('div', 'main-header_control');
        const logoutBtn = ElemConstruct('button', 'main-header_logout', 'LogOut');
        logoutBtn.onclick = () => {
            removeDataUser();
            logOutHandle('USER_LOGOUT', userName, pass);
        };

        controlBlock.append(
            ElemConstruct('h1', 'main-header_title', 'Fun chat'),
            ElemConstruct('button', 'main-header_info', 'Info'),
            logoutBtn
        );
        return controlBlock;
    }

    public render(
        user: { login: string; password: string; isLogined: boolean },
        logOutHandle: (operationType: string, userName: string, word: string) => void | null
    ) {
        const header = ElemConstruct('div', 'main-header');
        header.append(this.makeUserNameElem(user.login), this.makeBtnsElem(user.login, user.password, logOutHandle));
        return header;
    }
}
