export interface CarData {
    name: string;
    color: string;
}

export interface CarProps extends CarData{
    id: number;
}

export interface WinParams {
    wins: number;
    time: number;
}

export interface WinCar extends WinParams {
    id: number;
}

export interface QueryParams {
    [key: string]: string | number
}

export interface CarEngine {
    velocity: number;
    distance: number;
}

export interface FullCarData extends CarData {
    wins: number;
    time: number;
}