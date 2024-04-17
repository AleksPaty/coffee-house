interface UserData {
    login: string;
    password: string;
    isLogined: boolean;
}

const encryptPass = (pass: string): string => {
    let result = 'abc';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < pass.length; i += 1) {
        result += `${alphabet[i % alphabet.length]}${i % 2 ? 4 : 2}${pass[i]}`;
    }
    return result;
};

const decryptPass = (pass: string): string => {
    let result = '';
    const password = pass.slice(3);
    for (let i = 0; i < password.length; i += 3) {
        result += password[i + 2];
    }
    return result;
};

export const setDataUser = (data: UserData): void => {
    const pass = encryptPass(data.password);
    const newData = {
        login: data.login,
        password: pass,
        isLogined: data.isLogined,
    };
    sessionStorage.setItem('user', JSON.stringify(newData));
};

export const getDataUser = (): string[] | null => {
    const strData = sessionStorage.getItem('user');
    if (strData) {
        const data = JSON.parse(strData) as UserData;
        const { login, password } = data;
        const dePassword = decryptPass(password);

        return [login, dePassword];
    }
    return strData as null;
};

export const removeDataUser = (): void => {
    sessionStorage.removeItem('user');
};
