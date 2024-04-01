export class WinnersPage {
    contentWrapper: HTMLElement
    headerBLock: HTMLElement;
    mainBlock: HTMLElement;

    constructor() {
        this.contentWrapper = document.createElement('div');
        this.headerBLock = document.createElement('h2');
        this.mainBlock = document.createElement('table');
    }

    public render() {
        this.contentWrapper.append(this.headerBLock, this.mainBlock);
    }
}