import { CarData } from '../types/interface';

export const carForm = (isHide: boolean, carData?: CarData) => {
    const formElem = document.createElement('form');
    const textInput = document.createElement('input');
    const colorInput = document.createElement('input');

    textInput.type = 'text';
    textInput.className = 'car-name-input';
    colorInput.type = 'color';
    colorInput.className = 'car-color-input';

    if (carData) {
        textInput.value = carData.name;
        colorInput.value = carData.color;
    }

    formElem.className = `car-change-form ${isHide ? 'hide' : ''}`;
    formElem.append(textInput, colorInput);
    return formElem;
};
