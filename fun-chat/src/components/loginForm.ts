import { ElemConstruct } from '../utils/elemConstruct';

export class LoginForm {
    valueInputs: string[];
    amountBtn: number;

    constructor(valueInputs: string[], amountBtn = 1) {
        this.valueInputs = valueInputs;
        this.amountBtn = amountBtn;
    }

    private buildForm(websocketRequest: (operationType: string, userName: string, word: string) => void): HTMLElement {
        const formElem = ElemConstruct('form', 'login__form', undefined, undefined, [{ action: '' }]);
        ElemConstruct('h2', 'login__title', 'Login', formElem);

        formElem.addEventListener('submit', (e) => {
            e.preventDefault();
            const [firstName, password] = formElem.querySelectorAll('input');
            websocketRequest('USER_LOGIN', firstName.value, password.value);

            this.removeForm(formElem);
        });
        return formElem;
    }

    private buildInputs(): HTMLElement {
        const loginBody = ElemConstruct('div', 'login__body');
        const fragment = document.createDocumentFragment();

        this.valueInputs.forEach((input, i) => {
            const wrapper = ElemConstruct('div', 'login__body_wrap');
            const regex = i === 0 ? '^[A-ZА-Я][a-zа-я\\-]{2,}' : '^[A-Za-z0-9]{3,}'; //eslint-disable-line
            const title = i === 0 ? `The first letter must be capitalized. Min length: 3` : `Min length: 4`;

            ElemConstruct('input', 'login__body_input', undefined, wrapper, [
                { type: input },
                { placeholder: i === 0 ? 'First Name' : 'Password' },
                { pattern: `${regex}` },
                { title },
                { required: '' },
            ]);

            fragment.append(wrapper);
        });

        loginBody.appendChild(fragment);
        return loginBody;
    }

    private buildButton(): DocumentFragment {
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= this.amountBtn; i += 1) {
            if (i === 1) {
                const btn = ElemConstruct('button', 'login__button', 'Login', undefined, [{ type: 'submit' }]);
                fragment.appendChild(btn);
            } else {
                const btn = ElemConstruct('button', 'login__button', 'Info', undefined);
                fragment.appendChild(btn);
            }
        }
        return fragment;
    }

    private removeForm(form: HTMLElement): void {
        form.remove();
    }

    public render(websocketRequest: (operationType: string, userName: string, word: string) => void): HTMLElement {
        const form = this.buildForm(websocketRequest);
        const loginBody = this.buildInputs();
        const fragmentBtns = this.buildButton();

        form.append(loginBody);
        form.append(fragmentBtns);
        return form;
    }
}
