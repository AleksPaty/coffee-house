import { RoutPages } from '../components/routPages';

console.log('Hallo world');
const App = (): void => {
    const rout = new RoutPages();
    rout.render();
};

App();
