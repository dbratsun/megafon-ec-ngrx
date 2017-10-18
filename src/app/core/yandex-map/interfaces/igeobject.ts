export interface IGeoObjectBase {
    getData(): IGeoObjectDataBase;
    toString(): string;
}

export interface IGeoObjectDataBase {    
}


export interface IPlacemarkData extends IGeoObjectDataBase{
    geometry: number[] | object | ymaps.IPointGeometry, 
    properties: object | ymaps.IDataManager, 
    options?: ymaps.IPlacemarkOptions    
}

export interface IPlacemark {
    getData(): IPlacemarkData
}