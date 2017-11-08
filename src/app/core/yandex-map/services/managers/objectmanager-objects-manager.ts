import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { YaObjectManagerObjects } from "app/core/yandex-map/directives/objectmanager-objects";
import { YandexMapsAPIWrapper } from "app/core/yandex-map/services/yandex-maps-api-wrapper";

@Injectable()
export class ObjectManagerObjectsManager {
    private _managers: Map<YaObjectManagerObjects, Promise<ymaps.objectManager.ObjectCollection>> = new Map<YaObjectManagerObjects, Promise<ymaps.objectManager.ObjectCollection>>(); 

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }

    add(manager: YaObjectManagerObjects): ymaps.objectManager.ObjectCollection {
        // const managerPromise = this._mapsWrapper.addObjectsToObjectCollection()
        // this._mapsWrapper
        return null;
    }
}