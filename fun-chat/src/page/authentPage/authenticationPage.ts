import { LoginForm } from '../../components/loginForm';

export class AuthenticationPage {
    loginForm: LoginForm;
    LoginRequest: (operationType: string, userName: string, word: string) => void;

    constructor(LoginRequest: (operationType: string, userName: string, word: string) => void) {
        this.loginForm = new LoginForm(['text', 'password'], 2);
        this.LoginRequest = LoginRequest;
    }

    public render(parent: HTMLElement) {
        parent.append(this.loginForm.render(this.LoginRequest));
    }
}
