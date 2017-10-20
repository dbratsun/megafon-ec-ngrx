import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from "../yandex-maps-api-wrapper";
import { YaObjectManager } from "../../directives/objectmanager";

@Injectable()
export class ObjectManagerManager {

    private _managers: Map<YaObjectManager, Promise<ymaps.ObjectManager>> = new Map<YaObjectManager, Promise<ymaps.ObjectManager>>();

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }
    
    add(manager: YaObjectManager, options?: ymaps.IObjectManagerOptions) {
        const managerPromise = this._mapsWrapper.createObjectManager(options);
        this._managers.set(manager, managerPromise);
    }

    delete(manager: YaObjectManager) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.removeObjectManager(m).then(() => {})
        });
    }

    clusters(manager: YaObjectManager): ymaps.objectManager.ClusterCollection {
        this._managers.get(manager).then((m) => {
            return this._mapsWrapper.getObjectManagerClusters(m).then((c: ymaps.objectManager.ClusterCollection) => {
                return c;
            })
        });
        return null;
    }

    addObjectsFromJson(manager: YaObjectManager, json: string) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.addObjectsToObjectManager(m, json);
        })
    }

}