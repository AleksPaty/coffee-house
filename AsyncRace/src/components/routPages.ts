import { GaragePage } from '../pages/garage/garagePage';
import { makeButton } from './button';

export class RoutPages {
    container: HTMLElement;
    controlElem: HTMLElement;
    contentElem: HTMLElement;
    garagePage = new GaragePage();

    constructor() {
        this.container = document.createElement('div');
        this.controlElem = document.createElement('div');
        this.contentElem = document.createElement('div');

        this.container.className = 'container';
        this.controlElem.className = 'page-control-wrap';
        this.contentElem.className = 'content-field';
    }

    private makeControlBtns() {
        const toGarage = makeButton('to Garage', 'btn_to-garage');
        const toWinners = makeButton('to winners', 'btn_to-winners');

        this.controlElem.append(toGarage, toWinners);
    }

    private makeBasicStructure() {
        this.makeControlBtns();
        document.body.append(this.container);
        this.container.append(this.controlElem, this.contentElem);
    }

    public render() {
        this.makeBasicStructure();
        this.contentElem.append(this.garagePage.render());
    }
}
