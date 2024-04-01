export const showWinner = (raceLine: HTMLElement, time: number, winCount?: number) => {
    const elem = document.createElement('div');
    const textElem = document.createElement('span');
    const carNameValue = raceLine.querySelector('.car-name') as HTMLElement | undefined;
    const carName = carNameValue!.innerText;
    elem.className = 'winnerBlock';
    textElem.className = 'win-text';

    if (!winCount) textElem.innerText = `${carName} win first (${time}s)!`;
    if (winCount) textElem.innerText = `${carName} win ${winCount} times (${time}s)!`;

    elem.append(textElem);
    elem.onclick = (e: Event) => {
        const winElem = e.target as HTMLElement;
        winElem.remove();
    };
    document.body.append(elem);
};
