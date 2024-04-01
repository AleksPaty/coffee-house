import { Winners } from '../../components/winners';
import { Pagination } from '../../utils/innerPagination';

export class WinnersPage {
    contentWrapper: HTMLElement;
    headerBLock: HTMLElement;
    mainBlock: HTMLElement;
    winnersTable = new Winners();
    pagination = new Pagination('btn_winnerPrev', 'btn_winnerNext');

    constructor() {
        this.contentWrapper = document.createElement('div');
        this.headerBLock = document.createElement('div');
        this.mainBlock = document.createElement('table');

        this.contentWrapper.className = 'winners-page hide';
        this.headerBLock.className = 'winners-page__header';
        this.mainBlock.className = 'winners-page__table';
    }

    private makeHeaderBlock(): void {
        const countWinnersElem = document.createElement('h2');
        const winnersPaginationElem = document.createElement('span');

        countWinnersElem.innerText = `Winners (${this.winnersTable.winnersCount})`;
        winnersPaginationElem.innerText = `Page # ${this.winnersTable.winnersPage}`;
        if (!this.headerBLock.firstChild) {
            this.headerBLock.append(countWinnersElem, winnersPaginationElem);
        }
    }

    public changeHeaderBlock(winnersCount?: number, page?: number): void {
        const countWinnersElem = this.headerBLock.children[0] as HTMLElement;
        const winnersPaginationElem = this.headerBLock.children[1] as HTMLElement;

        if (winnersCount) countWinnersElem.innerText = `Winners (${winnersCount})`;
        if (page) winnersPaginationElem.innerText = `Page # ${page}`;
    }

    private addPaginationHandle() {
        const paginationHandle = (e: Event, callback: (page: number) => number) => {
            const curBtn = e.target as HTMLButtonElement;
            const curPage = callback(0);
            if (curBtn.innerText === 'NEXT') {
                if (this.winnersTable.winnersCount > curPage * 10) {
                    callback(curPage + 1);
                    this.winnersTable.render(this.changeHeaderBlock.bind(this));
                    const prevBtn = curBtn.previousElementSibling as HTMLButtonElement;
                    prevBtn.disabled = false;
                }
            }
            if (curBtn.innerText === 'PREV') {
                callback(curPage - 1);
                if (curPage - 1 < 2) curBtn.disabled = true;
                this.winnersTable.render(this.changeHeaderBlock.bind(this));
            }
        };
        this.pagination.buttonPrev.onclick = (e: Event) => {
            paginationHandle(e, this.winnersTable.setPage.bind(this.winnersTable));
        };
        this.pagination.buttonNext.onclick = (e: Event) => {
            paginationHandle(e, this.winnersTable.setPage.bind(this.winnersTable));
        };
    }

    public clearWrapper() {
        this.contentWrapper.replaceChildren();
    }

    public render() {
        this.clearWrapper();
        this.makeHeaderBlock();
        this.addPaginationHandle();

        if (this.mainBlock.firstChild) this.mainBlock.replaceChildren();

        this.mainBlock.append(this.winnersTable.header, this.winnersTable.body);
        this.contentWrapper.append(this.headerBLock, this.mainBlock, this.pagination.elemWrapper);
        this.winnersTable.render(this.changeHeaderBlock.bind(this));
    }
}
