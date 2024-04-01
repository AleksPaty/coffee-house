import Api from '../Api/api';
import { WinCar } from '../types/interface';
import { showWinner } from './showWinner';

export const controlWinCar = async (car: HTMLElement, time: number) => {
    const garage = car.closest('.garage-main');
    if (!garage?.classList.contains('race')) return;

    if (!garage?.classList.contains('finish')) {
        garage?.classList.add('finish');
        const raceLine = car.closest('.car-race') as HTMLElement | undefined;
        const carId = Number(raceLine!.dataset.id);

        const responseCar = await Api.getWinner(carId);
        if (responseCar.status === 404) {
            showWinner(raceLine!, time);
            const winData = {
                id: carId,
                wins: 1,
                time,
            };
            Api.createWinner(winData).catch((err) => {
                console.error('Method createWinner Error:', (err as Error).message);
            });
            return;
        }
        if (responseCar.status === 200) {
            const carData = (await responseCar.json()) as WinCar;
            if (carData.time > time) carData.time = time;
            showWinner(raceLine!, time, carData.wins);
            Api.updateWinner(carId, carData).catch((err) => {
                console.error('Method updateWinner Error:', (err as Error).message);
            });
        }
    }
};
