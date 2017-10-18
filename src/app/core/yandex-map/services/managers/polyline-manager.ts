import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';

import { IGeoObjectBase, IPolyline, IPolylineData } from '../../interfaces/igeoobject';


@Injectable()
export class PolylineManager extends GeoObjectManagerBase {

    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject> {
        const data: IPolylineData = geoObject.getData() as IPolylineData;
        return this._mapsWrapper.createPolyline(
            data.geometry, data.properties, data.options    
        );
    }

    removeGeoObject(geoObject: ymaps.GeoObject) {
        geoObject.setParent(null);
    }

}
