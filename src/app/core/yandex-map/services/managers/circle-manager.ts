import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';

import { IGeoObjectBase, ICircle, ICircleData } from '../../interfaces/igeoobject';


@Injectable()
export class CircleManager extends GeoObjectManagerBase {

    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject> {
        const data: ICircleData = geoObject.getData() as ICircleData;
        return this._mapsWrapper.createCircle(
            data.geometry, data.properties, data.options    
        );
    }

    removeGeoObject(geoObject: ymaps.GeoObject) {
        geoObject.setParent(null);
    }

}
