import { carForm } from '../../utils/carForm';
import { controlAllCarHandle } from '../../utils/handlers';
import { makeButton } from '../button';

export class GarageForm {
    main = document.createElement('div');

    private makeRaceControlBtn(): void {
        const controlRaceWrap = document.createElement('div');
        const raceBtn = makeButton('race', 'btn_race-start');
        const reset = makeButton('reset', 'btn_reset');

        controlRaceWrap.className = 'race-control-wrap';
        raceBtn.onclick = controlAllCarHandle;
        reset.onclick = controlAllCarHandle;
        controlRaceWrap.append(raceBtn, reset);

        this.main.append(controlRaceWrap);
    }

    private makeCreateCarForm(): void {
        const wrapper = document.createElement('div');
        const createBtn = makeButton('create', 'btn_create-car');
        const generateBtn = makeButton('generate cars', 'btn_generate-cars');

        wrapper.className = 'car-form-wrap';
        wrapper.append(carForm(false), createBtn, generateBtn);
        this.main.append(wrapper);
        this.returnButtonsElem = () => {
            return [createBtn, generateBtn];
        };
    }

    public returnButtonsElem(): HTMLButtonElement[] | undefined {
        return undefined;
    }

    public render(parent: DocumentFragment) {
        this.main.className = 'garage-form';
        this.makeRaceControlBtn();
        const createBtns = this.makeCreateCarForm();

        parent.append(this.main);
        return createBtns;
    }
}
