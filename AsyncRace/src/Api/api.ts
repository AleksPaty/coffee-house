import { CarData, QueryParams, WinCar, WinParams } from '../types/interface';

export default class Api {
    static createQueryString(params: QueryParams): string {
        let paramsString = `?`;
        Object.keys(params).forEach((key) => {
            paramsString += `${key}=${params[key]}&`;
        });
        return paramsString.slice(0, -1);
    }

    static async getCar(id: number): Promise<Response | undefined> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/garage/';
            const response = await fetch(baseUrl + id);
            return response;
        } catch (error: unknown) {
            console.error('Method getCar Error:', (error as Error).message);
        }
        return undefined;
    }

    static async getCars(page = 1, limit = 7): Promise<Response> {
        const baseUrl = 'http://127.0.0.1:3000/garage';
        const params: QueryParams = {
            _page: page,
            _limit: limit,
        };
        const paramsUrl = Api.createQueryString(params);
        const response = await fetch(baseUrl + paramsUrl);

        return response;
    }

    static async updateCar(id: number, data: CarData): Promise<number> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/garage/';
            const response = await fetch(baseUrl + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response.status;
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async deleteCar(id: number): Promise<number> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/garage/';
            const response = await fetch(baseUrl + id, {
                method: 'DELETE',
            });
            return response.status;
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async createCar(data: CarData): Promise<number> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/garage';
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response.status;
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async startStopRequest(id: number, command: string): Promise<Response> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/engine';
            const params = {
                id,
                status: command,
            };
            const paramsUrl = Api.createQueryString(params);
            const response = await fetch(baseUrl + paramsUrl, {
                method: 'PATCH',
            });
            return response;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async switchCarEngine(id: number): Promise<Response> {
        const baseUrl = 'http://127.0.0.1:3000/engine';
        const params = {
            id,
            status: 'drive',
        };
        const paramsUrl = Api.createQueryString(params);
        const response = await fetch(baseUrl + paramsUrl, {
            method: 'PATCH',
        });
        return response;
    }

    static async getWinners(page: number, sort: string, order = 'ASC', limit = 10): Promise<Response> {
        const baseUrl = 'http://127.0.0.1:3000/winners';
        const params: QueryParams = {
            _page: page,
            _limit: limit,
            _sort: sort,
            _order: order,
        };
        const paramsUrl = Api.createQueryString(params);
        try {
            const response = await fetch(baseUrl + paramsUrl);
            return response;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getWinner(id: number): Promise<Response> {
        const baseUrl = 'http://127.0.0.1:3000/winners/';
        const response = await fetch(baseUrl + id);

        return response;
    }

    static async createWinner(data: WinCar) {
        try {
            const baseUrl = 'http://127.0.0.1:3000/winners';
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response.status;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async updateWinner(id: number, data: WinParams): Promise<Response> {
        try {
            const baseUrl = 'http://127.0.0.1:3000/winners/';
            const response = await fetch(baseUrl + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
