import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';

import { IGeoObjectBase, IPolygon, IPolygonData } from '../../interfaces/igeoobject';


@Injectable()
export class PolygonManager extends GeoObjectManagerBase {

    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject> {
        const data: IPolygonData = geoObject.getData() as IPolygonData;
        return this._mapsWrapper.createPolygon(
            data.geometry, data.properties, data.options    
        );
    }

    removeGeoObject(geoObject: ymaps.GeoObject) {
        geoObject.setParent(null);
    }

}
