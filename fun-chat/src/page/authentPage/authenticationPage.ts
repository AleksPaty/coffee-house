import { LoginForm } from '../../components/loginForm';
import { ElemConstruct } from '../../utils/elemConstruct';

export class AuthenticationPage {
    loginForm: LoginForm;
    LoginRequest: (operationType: string, userName: string, word: string) => void;

    constructor(LoginRequest: (operationType: string, userName: string, word: string) => void) {
        this.loginForm = new LoginForm(['text', 'password'], 2);
        this.LoginRequest = LoginRequest;
    }

    public makeErrorModal(message: string, isClick = true): HTMLElement {
        const modalWrap = ElemConstruct('div', 'modal-error-wrap');
        const modalBlock = ElemConstruct('div', 'modal-error-content', undefined, modalWrap);
        ElemConstruct('p', 'modal-error-text', message, modalBlock);
        if (isClick) modalWrap.onclick = () => modalWrap.remove();
        document.body.append(modalWrap);
        return modalWrap;
    }

    public render(parent: HTMLElement) {
        parent.append(this.loginForm.render(this.LoginRequest));
    }
}
