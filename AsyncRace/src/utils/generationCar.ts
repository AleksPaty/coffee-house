const modelsCar = [
    'Citroen',
    'Mazda',
    'Jeep',
    'Lexus',
    'Opel',
    'Peugeot',
    'Porsche',
    'Renault',
    'Suzuki',
    'Toyota',
    'Audi',
    'Ford',
    'Subaru',
    'Honda',
    'Hummer',
    'KIA',
    'Chevrolet',
    'Nissan',
    'Cadillac',
    'Bugatti',
];
const classesCar = [
    'Minicompact',
    'Subcompact',
    'Mid-size',
    'Full-size',
    'mid-size luxury',
    'full-size luxury',
    'Supercar',
    'Off-road vehicle',
    'Crossover',
    'Sports sedan',
];

const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = (): string => {
    const red = getRandomNumber(0, 255);
    const green = getRandomNumber(0, 255);
    const blue = getRandomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
};

export const generationCar = () => {
    const modelInd = getRandomNumber(0, modelsCar.length - 1);
    const classesInd = getRandomNumber(0, classesCar.length - 1);
    const color = getRandomColor();

    return [`${modelsCar[modelInd]} ${classesCar[classesInd]}`, color];
};
