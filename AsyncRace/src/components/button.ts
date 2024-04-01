export const makeButton = (text: string, className: string, type = 'button'): HTMLButtonElement => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.innerText = text.toUpperCase();
    btn.setAttribute('type', type);

    return btn;
};
