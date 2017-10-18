import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YaGeoObjectBase } from '../../directives/geoobjectbase';
import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { IGeoObjectBase, IGeoObjectManager } from '../../interfaces/igeoobject';

@Injectable()
export abstract class GeoObjectManagerBase implements IGeoObjectManager {
    protected _geoObjects: Map<IGeoObjectBase, Promise<ymaps.GeoObject>> = new Map<IGeoObjectBase, Promise<ymaps.GeoObject>>();

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }

    abstract createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject>;

    abstract removeGeoObject(geoObject: ymaps.GeoObject);   
    
    addGeoObject(geoObject: IGeoObjectBase) {   
        const geoObjectPromise = this.createGeoObject(geoObject);
        this._geoObjects.set(geoObject, geoObjectPromise);    
    }

    deleteGeoObject(geoObject: IGeoObjectBase): Promise<void> {
        const g = this._geoObjects.get(geoObject);
        if (g == null) {
            // already deleted
            return Promise.resolve();
        }
        return g.then((g: ymaps.GeoObject) => {
            return this._zone.run(() => {
                // for example - g.setParent(null);
                this.removeGeoObject(g);
                this._geoObjects.delete(geoObject);
            });
        });
    }

}