import { Api } from '../api/api';
import { AuthenticationPage } from '../page/authentPage/authenticationPage';
import { MainPage } from '../page/mainPage/mainPage';

export class Route {
    websocket: Api;
    loginPage: AuthenticationPage;
    mainPage: MainPage;

    constructor() {
        this.mainPage = new MainPage();
        this.websocket = new Api();
        this.loginPage = new AuthenticationPage(this.websocket.userOperation.bind(this.websocket));
    }

    public initPage(): void {
        const parent = document.getElementById('app');
        window.history.pushState({}, 'Login', 'login');
        this.loginPage.render(parent!);
        window.onpopstate = (event) => {
            console.log(`location: ${document.location.href}, state: ${JSON.stringify(event.state)}`);
        };
        console.log(document.location.origin);
        this.websocket.connection.onmessage = (e) => {
            console.log(e.data);
        };
    }
}
