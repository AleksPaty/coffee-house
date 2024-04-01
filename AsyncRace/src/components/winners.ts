import Api from '../Api/api';
import { WinCar, FullCarData, CarProps } from '../types/interface';
import { carView } from './car/car-view';

export class Winners {
    winnersCount = 0;
    winnersPage = 1;
    header = document.createElement('thead');
    body = document.createElement('tbody');

    constructor() {
        this.header.className = 'winners-page__table-header';
        this.makeHeader();
    }

    public setPage(page: number) {
        if (page > 0) this.winnersPage = page;
        return this.winnersPage;
    }

    private makeHeader(): void {
        const row = document.createElement('tr');
        for (let i = 0; i < 5; i += 1) {
            const elem = document.createElement('th');
            switch (i) {
                case 0:
                    elem.innerText = '№';
                    break;
                case 1:
                    elem.innerText = 'Car';
                    break;
                case 2:
                    elem.innerText = 'Name';
                    break;
                case 3:
                    elem.innerText = 'Wins';
                    break;
                case 4:
                    elem.innerText = 'Best time(s)';
                    break;
                default:
                    break;
            }
            row.append(elem);
        }
        this.header.append(row);
    }

    private carSetting(car: HTMLElement, color: string): void {
        const curCar = car;
        curCar.style.fill = `${color}`;
        curCar.setAttribute('width', '50px');
        curCar.setAttribute('height', '50px');
        curCar.setAttribute('viewBox', '0 0 125 40');
    }

    private makeRow(numb: number, carWinData: FullCarData): HTMLTableRowElement {
        const tableData = { numb, ...carWinData };
        const row = document.createElement('tr');

        Object.keys(tableData).forEach((data) => {
            const elem = document.createElement('td');
            if (data !== 'color') elem.innerText = `${tableData[data as keyof FullCarData]}`;
            if (data === 'color') {
                elem.insertAdjacentHTML('beforeend', carView);
                const car = elem.children[0] as HTMLElement;
                this.carSetting(car, `${tableData[data as keyof FullCarData]}`);
            }
            row.append(elem);
        });
        return row;
    }

    private async getWinnerCars(order = 'ASC', sort = 'id', page = this.winnersPage): Promise<WinCar[]> {
        const response = await Api.getWinners(page, sort, order);
        this.winnersCount = Number(response.headers.get('X-Total-Count'));
        const winnersData = (await response.json()) as WinCar[];
        return winnersData;
    }

    private async bundleFullCarData(data: WinCar): Promise<FullCarData | undefined> {
        try {
            const response = await Api.getCar(data.id);
            const carData = (await response?.json()) as CarProps;
            const carWinData = {
                color: carData.color,
                name: carData.name,
                wins: data.wins,
                time: data.time,
            };
            return carWinData;
        } catch (error) {
            console.error((error as Error).message);
        }
        return undefined;
    }

    public render(callback: (winnersCar: number, page: number) => void) {
        if (this.body.firstChild) this.body.replaceChildren();

        this.getWinnerCars()
            .then((dataArr) => {
                dataArr.forEach(async (winCar, i) => {
                    callback(this.winnersCount, this.winnersPage);
                    const carWinData = await this.bundleFullCarData(winCar);
                    this.body.append(this.makeRow(i + 1, carWinData!));
                });
            })
            .catch((err) => console.error('Error render win cars', (err as Error).message));
    }
}
