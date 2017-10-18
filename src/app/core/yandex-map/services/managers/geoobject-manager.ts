
import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YaGeoObjectBase } from '../../directives/geoobjectbase';
import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';

@Injectable()
export class GeoObjectManager {

    protected _geoObjects: Map<YaGeoObjectBase, Promise<ymaps.GeoObject>> = new Map<YaGeoObjectBase, Promise<ymaps.GeoObject>>();

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }

    deleteGeoObject(geoObjectBase: YaGeoObjectBase): Promise<void> {
        /*
        const g = this._geoObjects.get(geoObjectBase);
        if (g == null) {
            // already deleted
            return Promise.resolve();
        }
        return g.then((g: ymaps.GeoObject) => {
            return this._zone.run(() => {
                g.setParent(null);
                this._geoObjects.delete(geoObjectBase);
            });
        });
        */
        return Promise.resolve();
    }

    addGeoObject(geoObject: YaGeoObjectBase) {
        /*
        if (geoObject instanceof YaPlacemark1) {
            const p = geoObject as YaPlacemark1;
            let o = this._mapsWrapper.createPlacemark(
                [p.latitude, p.longitude],
                {
                },
                {
                    cursor: p.cursor,
                    draggable: p.draggable
                }

            )
            this._geoObjects.set(geoObject, o);            
        }
        let o = geoObject.createGeoObject();
        this._geoObjects.set(geoObject, o);            
        */
    }
    
    /*
    createPlacemark(geometry: number[] | object | ymaps.IPointGeometry, properties: object | ymaps.IDataManager, options?: ymaps.IPlacemarkOptions) {
        let o = this._mapsWrapper.createPlacemark(geometry, properties, options)
        this._geoObjects.set        
    }
    */
}

