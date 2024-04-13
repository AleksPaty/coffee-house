import { Route } from '../components/route';
import { ElemConstruct } from '../utils/elemConstruct';

class App {
    container: HTMLElement;
    route: Route;

    constructor() {
        this.container = ElemConstruct('div', 'container', undefined, document.body);
        this.container.id = 'app';
        this.route = new Route();
    }

    public render(): void {
        this.route.initPage();
        console.log('Hello world');
        // console.log(`${process.env.PUBLIC_URL}/login`);
        // window.history.pushState({ base: 'login' }, 'Login', `login`);
        // console.log(window.history);
        // console.log(location.href)
    }
}

export default App;
