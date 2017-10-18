import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YaGeoObjectBase } from '../../directives/geoobjectbase';
import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { IGeoObjectBase } from '../../interfaces/igeobject';

@Injectable()
export abstract class GeoObjectManagerBase {
    protected _geoObjects: Map<IGeoObjectBase, Promise<ymaps.GeoObject>> = new Map<IGeoObjectBase, Promise<ymaps.GeoObject>>();

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }

    abstract addGeoObject(geoObject: IGeoObjectBase);

    abstract deleteGeoObject(geoObject: IGeoObjectBase): Promise<void>;

}