/*
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManager} from '../managers/geoobject-manager';
import { YaGeoObjectBase } from '../../directives/geoobject';
import { YaPlacemark } from '../../directives/placemark';


@Injectable()
export class PlacemarkManager {
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

  protected _geoObjects: Map<YaPlacemark, Promise<ymaps.Placemark>> = new Map<YaPlacemark, Promise<ymaps.Placemark>>();
  
  constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }
  
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

  addGeoObject(geoObjectBase: YaPlacemark) {
      const geoObjectPromise = this.createGeoObjectPromise(geoObjectBase);
      this._geoObjects.set(geoObjectBase, geoObjectPromise);
  }
  
}
*/