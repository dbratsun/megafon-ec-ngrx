export interface IGeoObjectBase {
    getData(): IGeoObjectDataBase;
    toString(): string;
}

export interface IGeoObjectDataBase {    
}


export interface IPlacemarkData extends IGeoObjectDataBase {
    geometry: number[] | object | ymaps.IPointGeometry, 
    properties: object | ymaps.IDataManager, 
    options?: ymaps.IPlacemarkOptions    
}

export interface IPlacemark {
    getData(): IPlacemarkData
}

export interface IPolylineData extends IGeoObjectDataBase {
    geometry: number[][] | object | ymaps.ILineStringGeometry,
    properties: object | ymaps.IDataManager, 
    options?: ymaps.IPolylineOptions        
}

export interface IPolyline {
    getData(): IPolylineData
}

export interface IRectangleData extends IGeoObjectDataBase {
    geometry: number[][] | object | ymaps.IRectangleGeometry,
    properties: object | ymaps.IDataManager, 
    options?: ymaps.IRectangleOptions
}

export interface IRectangle {
    getData(): IRectangleData
}

export interface IPolygonData extends IGeoObjectDataBase {
    geometry: number[][] | object | ymaps.IPolygonGeometry,
    properties: object | ymaps.IDataManager, 
    options?: ymaps.IPolygonOptions
}

export interface IPolygon {
    getData(): IPolygonData
}

export interface ICircleData extends IGeoObjectDataBase {
    geometry: ymaps.ICircleGeometry[][][][] | number[][] | object,
    properties: object | ymaps.IDataManager, 
    options?: ymaps.ICircleOptions
}

export interface ICircle {
    getData(): ICircleData
}

// managers

export interface IGeoObjectManager {
    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject>;
    removeGeoObject(geoObject: ymaps.GeoObject);   
}
