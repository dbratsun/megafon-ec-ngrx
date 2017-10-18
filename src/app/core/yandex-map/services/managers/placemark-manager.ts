import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';
import { YaPlacemark } from '../../directives/placemark';

import { IGeoObjectBase, IPlacemark, IPlacemarkData } from '../../interfaces/igeobject';


@Injectable()
export class PlacemarkManager extends GeoObjectManagerBase {
    addGeoObject(geoObject: IGeoObjectBase) {
        const data: IPlacemarkData = geoObject.getData() as IPlacemarkData;
        const placemarkPromise = this._mapsWrapper.createPlacemark(
            data.geometry, data.properties, data.options    
        );
        this._geoObjects.set(geoObject, placemarkPromise);
    }

    deleteGeoObject(geoObject: IGeoObjectBase): Promise<void> {
        const g = this._geoObjects.get(geoObject);
        if (g == null) {
            // already deleted
            return Promise.resolve();
        }
        return g.then((g: ymaps.GeoObject) => {
            return this._zone.run(() => {
                g.setParent(null);
                this._geoObjects.delete(geoObject);
            });
        });
    }

    /*
    createGeoObjectPromise(geoObject: YaPlacemark): Promise<ymaps.Placemark> {
        return this._mapsWrapper.createPlacemark(
            [geoObject.latitude, geoObject.longitude],
            {
            },
            {
                cursor: geoObject.cursor,
                draggable: geoObject.draggable
            }
        )
    }
    */
    // protected _geoObjects: Map<YaPlacemark, Promise<ymaps.Placemark>> = new Map<YaPlacemark, Promise<ymaps.Placemark>>();
  
    // constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }

    /*
    deleteGeoObject(placemark: YaPlacemark): Promise<void> {
        const g = this._geoObjects.get(placemark);
        if (g == null) {
            // already deleted
            return Promise.resolve();
        }
        return g.then((g: ymaps.GeoObject) => {
            return this._zone.run(() => {
                g.setParent(null);
                this._geoObjects.delete(placemark);
            });
        });
    }
    */
}
