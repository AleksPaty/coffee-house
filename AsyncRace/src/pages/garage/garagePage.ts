import { CarRace } from '../../components/car-race/car-race';
import { Garage } from '../../components/garage/garage';
import { GarageForm } from '../../components/garage/garage-form';
import { Pagination } from '../../utils/innerPagination';
import { createCarHandle } from '../../utils/handlers';

export class GaragePage {
    headerBLock = new GarageForm();
    garageBlock = new Garage();
    pagination = new Pagination('btn_garagePrev', 'btn_garageNext');

    private addEvents(): void {
        const createCarBtns = this.headerBLock.returnButtonsElem();
        const [createBtn, generateBtn] = createCarBtns!;
        const carRace = new CarRace('name', 'color', 1, this.garageBlock.addDeleteCarHandle.bind(this.garageBlock));
        createBtn.addEventListener('click', (e) =>
            createCarHandle(
                e,
                carRace.setCar.bind(carRace),
                this.garageBlock.setLastId.bind(this.garageBlock),
                this.garageBlock.setCarCount.bind(this.garageBlock)
            )
        );
        console.log(generateBtn);

        this.pagination.buttonNext.onclick = (e) => this.paginationHandle.bind(this)(e);
        this.pagination.buttonPrev.onclick = (e) => this.paginationHandle.bind(this)(e);
    }

    public paginationHandle(e: Event) {
        const curBtn = e.target as HTMLButtonElement;
        const { page } = this.garageBlock;
        const maxCountRaceOnPage = 7;
        if (curBtn.innerText === 'NEXT') {
            const necessaryCountCar = (page + 1) * maxCountRaceOnPage - 6;
            if (necessaryCountCar <= this.garageBlock.carCount!) {
                this.garageBlock.main.replaceChildren();
                this.garageBlock.changePage(page + 1);
                const prevBtn = curBtn.previousElementSibling as HTMLButtonElement;
                prevBtn.disabled = false;
            }
            return;
        }

        if (curBtn.innerText === 'PREV') {
            this.garageBlock.main.replaceChildren();
            this.garageBlock.changePage(page - 1);
            if (page - 1 < 2) curBtn.disabled = true;
        }
    }

    public render(): DocumentFragment {
        const fragment = document.createDocumentFragment();
        document.body.append(fragment);
        this.headerBLock.render(fragment);
        this.garageBlock.addRenderElem(fragment);
        fragment.append(this.pagination.elemWrapper);
        this.addEvents();

        return fragment;
    }
}
