import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { YandexMapsAPIWrapper } from "../yandex-maps-api-wrapper";
import { YaObjectManager } from "../../directives/objectmanager";


export function toObjects(object: ymaps.ObjectManagerObjectCore): ymaps.ObjectManagerObject {
    return {
        id: object.id,
        type: "Feature",
        geometry: object.geometry,
        options: object.options,
        properties: object.properties
    }
}

export function toObjectsCollection(objects: ymaps.ObjectManagerObjectsCollectionCore): ymaps.ObjectManagerObjectsCollection {
    let collection: ymaps.ObjectManagerObjectsCollection = {
        type: "FeatureCollection",
        features: new Array<ymaps.ObjectManagerObjectCore>()
    };
    objects.features.forEach(f => {
        collection.features.push(toObjects(f))
    });
    return collection;
}

@Injectable()
export class ObjectManagerManager {

    private _managers: Map<YaObjectManager, Promise<ymaps.ObjectManager>> = new Map<YaObjectManager, Promise<ymaps.ObjectManager>>();

    constructor(protected _mapsWrapper: YandexMapsAPIWrapper, protected _zone: NgZone) { }
    
    add(manager: YaObjectManager, options?: ymaps.IObjectManagerOptions, objects?: ymaps.ObjectManagerObjectsCollectionCore) {
        var ob: ymaps.ObjectManagerObjectsCollection = null;
        if (objects) {
            let ob = toObjectsCollection(objects);
        }
        const managerPromise = this._mapsWrapper.createObjectManager(options, ob);
        this._managers.set(manager, managerPromise);
    }

    addToMap(manager: YaObjectManager) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.addObjectManagerToMap(m);
        })
    }

    delete(manager: YaObjectManager) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.removeObjectManager(m).then(() => {
                this._managers.delete(manager);
            })
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

    setClustersOptions(manager: YaObjectManager, key: object | string, value?: object) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.setObjectManagerClustersOptions(m, key, value);
        })
    }

    objects(manager: YaObjectManager): ymaps.objectManager.ObjectCollection {
        this._managers.get(manager).then((m) => {
            return this._mapsWrapper.getObjectManagerObjects(m).then((o: ymaps.objectManager.ObjectCollection) => {
                return o;
            })
        });
        return null;
    }

    setObjectsOptions(manager: YaObjectManager, key: object | string, value?: object) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.setObjectManagerObjectsOptions(m, key, value);
        })
    }

    setObjectOptions(manager: YaObjectManager, objectId: number, options: object) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.setObjectManagerObjectOptions(m, objectId, options);
        })
    }

    addObjectsFromJson(manager: YaObjectManager, json: string) {
        this._managers.get(manager).then((m) => {
            this._mapsWrapper.addObjectsToObjectManager(m, json);
        })
    }

    addObjects(manager: YaObjectManager, objects: ymaps.ObjectManagerObjectsCollectionCore, options?: ymaps.objectManager.IObjectCollectionOptions) {
        this._managers.get(manager).then((m) => {
            var o = toObjectsCollection(objects);
            this._mapsWrapper.addObjectsToObjectManager(m, o);
            if (options) {
                this._mapsWrapper.setObjectManagerObjectsOptions(m, options);
            }
        })
    }

    updateObjects(manager: YaObjectManager, objects: ymaps.ObjectManagerObjectsCollectionCore) {
        this._managers.get(manager).then(m => {
            this._mapsWrapper.removeAllObjectsFromObjectManager(m).then(() => {
                this._mapsWrapper.addObjectsToObjectManager(m, toObjectsCollection(objects));
            })

        })
    }

}

/*
export class ObjectManagerObjectsCollectionClass implements ymaps.ObjectManagerObjectsCollection {
    private _type: string = "FeatureCollection";
    constructor(private _features: ObjectManagerObjectClass[]) {}
    get type(): string {
        return this._type;
    }
    get features(): ymaps.ObjectManagerObject[] {
        let fs = new Array<ymaps.ObjectManagerObject>();
        this._features.forEach(f => {
            fs.push(f.to())
        })
        return fs;
    }
    to(): ymaps.ObjectManagerObjectsCollection {
        return {
            type: this._type,
            features: this.features
        }
    }
}

export class ObjectManagerObjectClass implements ymaps.ObjectManagerObject {
    private _type: string = "Feature";
    constructor (private _id: number, private _geometry: ymaps.ObjectManagerObjectGeometry,
         private _options?: ymaps.ObjectManagerObjectOptions, private _properties?: ymaps.ObjectManagerObjectProperties) {}
    get id(): number {
        return this._id;
    }
    get type(): string {
        return this._type;
    }
    get geometry(): ymaps.ObjectManagerObjectGeometry {
        return this._geometry;
    }
    get options(): ymaps.ObjectManagerObjectOptions {
        return this._options;
    }
    get properties(): ymaps.ObjectManagerObjectProperties {
        return this._properties;
    }

    to(): ymaps.ObjectManagerObject {
        return {
            id: this._id,
            type: this._type,
            geometry: this._geometry,
            options: this._options,
            properties: this._properties

        }
    }
}
*/
