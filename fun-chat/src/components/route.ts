import { Api } from '../api/api';
import { AuthenticationPage } from '../page/authentPage/authenticationPage';
import { MainPage } from '../page/mainPage/mainPage';
import { PayloadUserList, UserResponse, UserLogin, MessageData, MessageStatus } from '../types/interfaces';
import { getDataUser, removeDataUser } from '../utils/storageUtils';
import { changeMessageStatus } from './messageElem';

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
            this.pageResolver(document.location.pathname);
        };
    }

    private pageResolver(location: string): void {
        const parent = document.getElementById('app');
        const appLocation = location.split('/').at(-1);
        parent?.replaceChildren();

        switch (appLocation) {
            case 'login':
                this.loginPage.render(parent!);
                break;
            case 'main':
                this.websocket.getAllUsers();
                parent?.append(this.mainPage.render(this.websocket));
                break;
            case 'info':
                parent!.innerText = 'On info page';
                break;
            default:
                break;
        }
    }

    private serverListener(): void {
        this.websocket.connection.onmessage = (e) => {
            const responseData = JSON.parse(e.data as string) as UserResponse;
            console.log(responseData);
            switch (responseData.type) {
                case 'USER_LOGIN': {
                    const [login, password] = getDataUser()!;
                    this.mainPage.user = { login, password, isLogined: true };
                    if (!document.location.pathname.includes('/main')) {
                        window.history.pushState({}, 'Chat', 'main');
                        this.pageResolver(document.location.pathname);
                    }
                    break;
                }
                case 'ERROR': {
                    const a = responseData.payload as { error: string };
                    this.loginPage.makeErrorModal(a.error);
                    removeDataUser();
                    break;
                }
                case 'USER_ACTIVE':
                case 'USER_INACTIVE': {
                    const { users } = responseData.payload as PayloadUserList;
                    this.mainPage.userList.addUsers(
                        this.mainPage.user.login,
                        users,
                        this.websocket.getMessageHistory.bind(this.websocket)
                    );
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
                    this.pageResolver(document.location.pathname);
                    break;
                }
                case 'MSG_FROM_USER': {
                    const messages = responseData.payload as { messages: MessageData[] };
                    if (!this.mainPage.userChat.container.dataset.name) {
                        this.mainPage.userList.showUnreadMessageCount(this.mainPage.user.login, messages.messages);
                    } else {
                        this.mainPage.userChat.addOldMessages(messages.messages);
                    }
                    break;
                }
                case 'MSG_SEND': {
                    const message = responseData.payload as { message: MessageData };
                    const chatField = this.mainPage.userChat.messagesField!;
                    const friendName = this.mainPage.userChat.container.dataset.name;

                    if (friendName) {
                        if (friendName === message.message.from || this.mainPage.user.login === message.message.from) {
                            if (chatField.children.item(0)?.className === 'main-chat_field-startMessage') {
                                chatField.replaceChildren();
                            }
                            this.mainPage.userChat.addNewMessage(
                                message.message,
                                this.mainPage.userChat.container.dataset.name!
                            );
                        }
                    } else {
                        this.mainPage.userList.showUnreadMessageCount(this.mainPage.user.login, [message.message]);
                    }
                    break;
                }
                case 'MSG_DELIVER':
                case 'MSG_READ': {
                    const messageStatus = responseData.payload as { message: MessageStatus };
                    changeMessageStatus(messageStatus.message);
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
            this.pageResolver(document.location.pathname);
            console.log(`location: ${document.location.href}, state: ${JSON.stringify(event.state)}`);
        };
    }
}
