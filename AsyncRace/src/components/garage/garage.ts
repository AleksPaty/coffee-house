import Api from '../../Api/api';
import { CarProps } from '../../types/interface';
import { deleteCar } from '../../utils/carRaceHandle';
import { CarRace } from '../car-race/car-race';

export class Garage {
    header: HTMLElement;
    main: HTMLElement;
    page = 1;
    cars: CarProps[] | null = null;
    carCount: number | null = 0;
    lastCarId = 1;

    constructor() {
        this.header = document.createElement('div');
        this.main = document.createElement('ul');
        this.main.className = 'garage-main';
    }

    private headerTextRender(carCount: number | null) {
        const headerText = document.createElement('h2');
        const pageCountView = document.createElement('span');

        headerText.innerText = `Garage(${carCount})`;
        pageCountView.innerText = `Page # ${this.page}`;
        this.header.append(headerText, pageCountView);
    }

    private changeHeaderText(carCount?: number | null, curPage?: number) {
        if (carCount) {
            const headerText = this.header.children[0] as HTMLElement;
            headerText.innerText = `Garage(${carCount})`;
        }
        if (curPage) {
            const pageCountView = this.header.children[1] as HTMLElement;
            pageCountView.innerText = `Page # ${this.page}`;
        }
    }

    private async getGarageData(page = 1): Promise<void> {
        try {
            const response = await Api.getCars(page);
            const cars = (await response.json()) as CarProps[];

            this.cars = cars;
            this.carCount = Number(response.headers.get('X-Total-Count'));
            this.setLastId(cars[cars.length - 1].id);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public setCarCount(carCount: number): number {
        if (carCount > 0) this.carCount = carCount;
        return this.carCount!;
    }

    public setLastId(lastId: number): number {
        if (lastId > 0) this.lastCarId = lastId;
        return this.lastCarId;
    }

    public addDeleteCarHandle(e: Event) {
        deleteCar(e)
            .then((result) => {
                if (result) {
                    if (this.carCount! < 8) {
                        const curBtn = e.target as HTMLButtonElement;
                        const raceElem = curBtn.closest('.car-race');
                        raceElem?.remove();

                        this.setCarCount(this.carCount! - 1);
                        this.changeHeaderText(this.carCount);
                    } else {
                        this.main.replaceChildren();
                        this.render(this.page);
                        this.changeHeaderText(this.carCount! - 1);
                    }
                }
            })
            .catch((error: Error) => console.error(error.message));
    }

    public changePage(newPage: number) {
        this.page = newPage;
        this.render(newPage);
        this.changeHeaderText(null, this.page);
    }

    public render(page = 1) {
        this.getGarageData(page)
            .then(() => {
                if (this.header.children.length < 1) {
                    this.header.classList.add('garage-header');
                    this.headerTextRender(this.carCount);
                }

                const carRace = new CarRace('name', 'color', 999, this.addDeleteCarHandle.bind(this));
                this.cars?.forEach((carData) => {
                    this.main.append(carRace.setCar(carData.name, carData.color, carData.id));
                });
            })
            .catch((err) => console.error(err));
    }

    public addRenderElem(parent: DocumentFragment, page = 1) {
        this.render(page);
        parent.append(this.header, this.main);
    }
}
