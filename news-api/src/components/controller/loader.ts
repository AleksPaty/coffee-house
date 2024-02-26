export type CallbackFunc<T> = (data?: T | undefined) => void;

class Loader {
    private baseLink: string;
    private options: object;

    constructor(baseLink: string | undefined, options: object) {
        if (typeof baseLink === 'string') {
            this.baseLink = baseLink;
        } else {
            this.baseLink = '';
            throw new Error('baseLink is undefined');
        }
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: object },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: object, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: CallbackFunc<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
