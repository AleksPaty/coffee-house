import { carForm } from '../../utils/carForm';
import { carStartHandle, changeCarHandleWrap } from '../../utils/carRaceHandle';
import { makeButton } from '../button';
import { Car } from '../car/car';
import raceFlag from './raceFlag';

export class CarRace {
    car: Car;
    deleteCarHandle: (e: Event) => void;

    constructor(name: string, color: string, id: number, callBack: (e: Event) => void) {
        this.car = new Car(name, color, id);
        this.deleteCarHandle = callBack;
    }

    public setCar(name: string, color: string, id: number): HTMLElement {
        this.car = new Car(name, color, id);
        const lineElem = this.makeCarRace();
        return lineElem;
    }

    private makeHeaderLine(): HTMLElement {
        const header = document.createElement('div');
        const carName = document.createElement('span');
        const changeCarBtn = makeButton('change', 'btn_change-car');
        const removeCarBtn = makeButton('remove', 'btn_remove-car');

        header.classList.add('car-line_header');
        carName.className = 'car-name';
        carName.innerText = this.car.carName;
        carName.style.color = this.car.carColor;

        changeCarBtn.onclick = changeCarHandleWrap();
        removeCarBtn.addEventListener('click', this.deleteCarHandle);

        header.append(this.carForm(), changeCarBtn, removeCarBtn, carName);
        return header;
    }

    private carForm(): HTMLElement {
        return carForm(true, { name: this.car.carName, color: this.car.carColor });
    }

    private makeCarControlElem(parent: HTMLElement): void {
        const wrap = document.createElement('div');
        wrap.className = 'car-controls';
        const startBtn = makeButton('start', 'btn_startMove');
        const stopBtn = makeButton('stop', 'btn_stopMove');
        startBtn.onclick = carStartHandle;
        stopBtn.onclick = carStartHandle;
        stopBtn.disabled = true;
        wrap.append(startBtn, stopBtn);
        parent.append(wrap);
    }

    public makeCarRace(): HTMLElement {
        const lineElem = document.createElement('li');
        const carLineMain = document.createElement('div');
        lineElem.classList.add('car-race');
        lineElem.dataset.id = `${this.car.carId}`;
        carLineMain.className = 'car-line_main';

        lineElem.append(this.makeHeaderLine());
        lineElem.append(carLineMain);
        this.makeCarControlElem(carLineMain);
        this.car.makeCar(carLineMain);
        carLineMain.insertAdjacentHTML('beforeend', raceFlag);
        return lineElem;
    }
}
