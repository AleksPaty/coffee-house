import { carView } from './car-view';

export class Car {
    carName: string;
    carColor: string;
    carId: number;

    constructor(name: string, color: string, id: number) {
        this.carName = name;
        this.carColor = color;
        this.carId = id;
    }

    public makeCar(parent: HTMLElement): void {
        const container = document.createElement('div');
        container.insertAdjacentHTML('beforeend', carView);
        const car = container.children[0] as HTMLElement;
        if (car) {
            car.classList.add(`car`);
            car.style.fill = this.carColor;
            parent.append(car);
        }
    }
}
