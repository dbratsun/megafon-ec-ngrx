import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';

import { IGeoObjectBase, IPlacemark, IPlacemarkData } from '../../interfaces/igeoobject';


@Injectable()
export class PlacemarkManager extends GeoObjectManagerBase {

    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject> {
        const data: IPlacemarkData = geoObject.getData() as IPlacemarkData;
        return this._mapsWrapper.createPlacemark(
            data.geometry, data.properties, data.options    
        );
    }

    removeGeoObject(geoObject: ymaps.GeoObject) {
        geoObject.setParent(null);
    }

}
