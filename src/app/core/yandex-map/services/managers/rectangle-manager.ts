import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from '../yandex-maps-api-wrapper';
import { GeoObjectManagerBase} from '../managers/geoobjectbase-manager';
import { YaGeoObjectBase } from '../../directives/geoobjectbase';

import { IGeoObjectBase, IRectangle, IRectangleData } from '../../interfaces/igeoobject';


@Injectable()
export class RectangleManager extends GeoObjectManagerBase {

    createGeoObject(geoObject: IGeoObjectBase): Promise<ymaps.GeoObject> {
        const data: IRectangleData = geoObject.getData() as IRectangleData;
        return this._mapsWrapper.createRectangle(
            data.geometry, data.properties, data.options    
        );
    }

    removeGeoObject(geoObject: ymaps.GeoObject) {
        geoObject.setParent(null);
    }

}
