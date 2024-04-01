import { makeButton } from '../components/button';

export class Pagination {
    elemWrapper = document.createElement('div');
    buttonPrev: HTMLButtonElement;
    buttonNext: HTMLButtonElement;

    constructor(btnPrevClass: string, btnNextClass: string) {
        this.buttonPrev = makeButton('prev', `${btnPrevClass}`);
        this.buttonPrev.disabled = true;
        this.buttonNext = makeButton('next', `${btnNextClass}`);

        this.elemWrapper.className = 'garage-pagination';
        this.elemWrapper.append(this.buttonPrev, this.buttonNext);
    }
}
