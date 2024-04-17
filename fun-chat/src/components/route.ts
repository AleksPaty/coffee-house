import { Api } from '../api/api';
import { AuthenticationPage } from '../page/authentPage/authenticationPage';
import { MainPage } from '../page/mainPage/mainPage';
import { PayloadUserList, UserRequest, UserLogin } from '../types/interfaces';
import { getDataUser } from '../utils/storageUtils';

export class Route {
    websocket: Api;
    loginPage: AuthenticationPage;
    mainPage: MainPage;

    constructor() {
        this.mainPage = new MainPage();
        this.websocket = new Api();
        this.loginPage = new AuthenticationPage(this.websocket.userOperation.bind(this.websocket));
    }

    private autoAuthentic(login: string, password: string): void {
        this.mainPage.user = { login, password, isLogined: true };
        this.websocket.connection.onopen = (): void => {
            this.websocket.userOperation('USER_LOGIN', login, password);
            this.pageResolver(document.location.pathname, login);
        };
    }

    private pageResolver(location: string, userName?: string): void {
        const parent = document.getElementById('app');
        parent?.replaceChildren();

        switch (location) {
            case '/login':
                this.loginPage.render(parent!);
                break;
            case '/main':
                this.websocket.getAllUsers();
                parent?.append(this.mainPage.render(userName!, this.websocket.userOperation.bind(this.websocket)));
                break;
            case '/info':
                parent!.innerText = 'On info page';
                break;
            default:
                break;
        }
    }

    private serverListener(): void {
        this.websocket.connection.onmessage = (e) => {
            const responseData = JSON.parse(e.data as string) as UserRequest;
            console.log(responseData);
            switch (responseData.type) {
                case 'USER_LOGIN': {
                    const [login, password] = getDataUser()!;
                    this.mainPage.user = { login, password, isLogined: true };
                    if (document.location.pathname !== '/main') {
                        window.history.pushState({}, 'Chat', 'main');
                        this.websocket.getAllUsers();
                        this.pageResolver('/main', this.mainPage.user.login);
                    }
                    break;
                }
                case 'USER_ACTIVE':
                case 'USER_INACTIVE': {
                    const { users } = responseData.payload as PayloadUserList;
                    this.mainPage.userList.addUsers(this.mainPage.user.login, users);
                    break;
                }
                case 'USER_EXTERNAL_LOGIN':
                case 'USER_EXTERNAL_LOGOUT': {
                    const user = responseData.payload as { user: UserLogin };
                    this.mainPage.userList.changeStatus(user.user.login, user.user.isLogined);
                    break;
                }
                case 'USER_LOGOUT': {
                    window.history.replaceState({}, 'Login', 'login');
                    this.pageResolver('/login');
                    break;
                }
                default:
                    break;
            }
        };
    }

    public initPage(): void {
        const userData = getDataUser();
        if (!userData) {
            window.history.pushState({}, 'Login', 'login');
            this.pageResolver(document.location.pathname);
        }
        if (userData) {
            const [login, password] = userData;
            this.autoAuthentic(login, password);
        }

        this.serverListener();

        window.onpopstate = (event) => {
            console.log('onpopstate');
            this.pageResolver(document.location.pathname, this.mainPage.user.login);
            console.log(`location: ${document.location.href}, state: ${JSON.stringify(event.state)}`);
        };
    }
}
