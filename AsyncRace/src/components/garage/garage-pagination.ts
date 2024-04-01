import { makeButton } from '../button';

export class GaragePagination {
    elemWrapper = document.createElement('div');
    buttonPrev: HTMLButtonElement;
    buttonNext: HTMLButtonElement;

    constructor() {
        this.buttonPrev = makeButton('prev', 'btn_garagePrev');
        this.buttonPrev.disabled = true;
        this.buttonNext = makeButton('next', 'btn_garageNext');

        this.elemWrapper.className = 'garage-pagination';
        this.elemWrapper.append(this.buttonPrev, this.buttonNext);
    }
}
