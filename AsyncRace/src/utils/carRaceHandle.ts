import Api from '../Api/api';
import { CarEngine } from '../types/interface';
import { controlWinCar } from './controlWinCar';

export const changeCarHandleWrap = (): ((e: Event) => void) => {
    let textValue = '';
    let colorValue = '';
    const changeCarHandle = (e: Event) => {
        const btn = e.currentTarget as HTMLButtonElement;
        const form = btn.previousElementSibling as HTMLFormElement;
        const textInput = form.children[0] as HTMLInputElement;
        const colorInput = form.children[1] as HTMLInputElement;

        if (form && form.classList.contains('hide')) {
            form.classList.remove('hide');
            [textValue, colorValue] = [textInput.value, colorInput.value];
        } else if (form) {
            if (textInput.value !== textValue || colorInput.value !== colorValue) {
                const carRace: HTMLElement = btn.closest('.car-race')!;
                const nameCar: HTMLElement = carRace.querySelector('.car-name')!;
                const car: HTMLElement = carRace.querySelector('.car')!;
                Api.updateCar(Number(carRace.dataset.id), { name: textInput.value, color: colorInput.value })
                    .then((result) => {
                        if (result === 200) {
                            nameCar.innerText = textInput.value;
                            car.style.fill = colorInput.value;
                        }
                    })
                    .catch((err: Error) => console.error('Method updateCar Error:', err.message));
            }
            form.classList.add('hide');
        }
    };
    return changeCarHandle;
};

export const deleteCar = async (e: Event): Promise<boolean> => {
    let isDelete = false;
    try {
        const deleteBtn = e.currentTarget as HTMLButtonElement;
        const carRace: HTMLElement = deleteBtn.closest('.car-race')!;
        const status = await Api.deleteCar(Number(carRace.dataset.id));

        if (status) {
            isDelete = true;
        }
    } catch (error: unknown) {
        console.error('Method deleteCar Error:', (error as Error).message);
    }
    return isDelete;
};

const makeCarAnimation = (car: HTMLElement, time: number): Animation => {
    const distance = car.parentElement?.offsetWidth;
    const carWidth = 25;
    const gap = 8;
    const startPoint = (car.previousElementSibling as HTMLElement).offsetWidth + gap;
    const distanceToEndLine = 40;
    const finalDistance = distance! - startPoint - carWidth - distanceToEndLine;
    const moveCarPoints = [{ transform: `translateX(${finalDistance}px) matrix(-1, 0, 0, 1, 0, 0)` }];
    const moveTiming = {
        duration: Math.round(time),
        iterations: 1,
    };

    const animation = car.animate(moveCarPoints, moveTiming);
    animation.onfinish = () => {
        const curCar = car;
        const carTime = (time / 1000).toFixed(2);

        curCar.style.transform = `translateX(${finalDistance}px) matrix(-1, 0, 0, 1, 0, 0)`;
        controlWinCar(curCar, +carTime);
    };
    return animation;
};

export const carStartHandle = async (e: Event): Promise<void> => {
    const curBtn = e.currentTarget as HTMLButtonElement;
    const car = curBtn.parentElement!.nextElementSibling as HTMLElement;
    const carRace: HTMLElement = curBtn.closest('.car-race')!;

    try {
        if (!car.classList.contains('drive')) {
            const response = await Api.startStopRequest(Number(carRace.dataset.id), 'started');
            const data = (await response.json()) as CarEngine;
            const movingTime = data.distance / data.velocity;

            car.classList.add('drive');
            const startBtn = curBtn;
            const stopBtn = curBtn.nextElementSibling as HTMLButtonElement;
            stopBtn.disabled = false;
            startBtn.disabled = true;

            const carAnimation = makeCarAnimation(car, movingTime);
            const carEngineStatus = (await Api.switchCarEngine(Number(carRace.dataset.id))).status;
            if (carEngineStatus === 500) {
                carAnimation.pause();
            }
        } else {
            Api.startStopRequest(Number(carRace.dataset.id), 'stopped').catch((err: unknown) => {
                console.error('Method startStopRequest Error:', (err as Error).message);
            });
            const carAnimation = car.getAnimations()[0];
            if (carAnimation) carAnimation.cancel();

            car.style.transform = 'matrix(-1, 0, 0, 1, 0, 0)';
            car.classList.remove('drive');
            const stopBtn = curBtn;
            const startBtn = curBtn.previousElementSibling as HTMLButtonElement;
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    } catch (error: unknown) {
        console.error('Method carStartHandle Error:', (error as Error).message);
    }
};
