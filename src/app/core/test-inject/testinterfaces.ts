export interface IBaseObject {
    getName(): string;
    getData(): IBaseObjectData;
}

export interface IBaseObjectData {
}

export interface IChildObjectData extends IBaseObjectData{
    position: number;
    title: string;
}

export interface IChildObject {
    getData(): IChildObjectData;
}