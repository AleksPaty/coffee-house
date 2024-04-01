import { GaragePage } from '../pages/garage/garagePage';
import { WinnersPage } from '../pages/winners/winnersPage';
import { makeButton } from './button';

export class RoutPages {
    container: HTMLElement;
    controlElem: HTMLElement;
    contentElem: HTMLElement;
    garagePage = new GaragePage();
    winnersPage = new WinnersPage();

    constructor() {
        this.container = document.createElement('div');
        this.controlElem = document.createElement('div');
        this.contentElem = document.createElement('div');

        this.container.className = 'container';
        this.controlElem.className = 'page-control-wrap';
        this.contentElem.className = 'content-field';
    }

    private makeControlBtns() {
        const toGarage = makeButton('to garage', 'btn_to-garage');
        const toWinners = makeButton('to winners', 'btn_to-winners');

        toGarage.onclick = this.makeControlHandle.bind(this);
        toWinners.onclick = this.makeControlHandle.bind(this);
        this.controlElem.append(toGarage, toWinners);
    }

    private makeControlHandle(e: Event) {
        const curBtn = e.target as HTMLButtonElement;
        if (curBtn.innerText === 'to winners'.toUpperCase()) {
            this.winnersPage.render();
            this.winnersPage.contentWrapper.classList.remove('hide');
        }
        if (curBtn.innerText === 'to garage'.toUpperCase()) {
            this.winnersPage.clearWrapper();
            this.winnersPage.contentWrapper.classList.add('hide');
        }
    }

    private makeBasicStructure() {
        this.makeControlBtns();
        document.body.append(this.container);
        this.container.append(this.controlElem, this.contentElem);
    }

    public render() {
        this.makeBasicStructure();
        this.contentElem.append(this.garagePage.render(), this.winnersPage.contentWrapper);
    }
}
