import { Directive, EventEmitter, OnChanges, OnDestroy, DoCheck, AfterContentInit, SimpleChanges, Input, Output, Inject, Injector, Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { GeoObjectManagerBase } from '../services/managers/geoobjectbase-manager';
import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

import { IGeoObjectBase, IGeoObjectDataBase } from '../interfaces/igeoobject';

let geoObjectId = 0;

@Injectable()
export abstract class YaGeoObjectBase implements IGeoObjectBase, OnDestroy, DoCheck {

    private _id: string;
    private _addedToManager: boolean = false;
    private _observableSubscriptions: Subscription[] = [];
    
    constructor(protected _geoObjectManager: GeoObjectManagerBase) {
        this._id = (geoObjectId++).toString();
    }
    
    ngOnDestroy() {
        this._geoObjectManager.deleteGeoObject(this);
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    ngDoCheck() {
        if (!this._addedToManager) {
            this._geoObjectManager.addGeoObject(this);
            this._addedToManager = true;
        }
    }

    abstract getData(): IGeoObjectDataBase;

    id(): string {
        return this._id;
    }

    abstract toString(): string;    

    // abstract createGeoObject(): Promise<ymaps.GeoObject>
}

/*
@Directive({
    selector: 'ya-geoobject'
})
export class YaGeoObject extends YaGeoObjectBase implements OnChanges, AfterContentInit {

    @Input() circleOverlay: string = 'default#circle';
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;
    @Input() fill: boolean = true;

    private _feature: ymaps.IGeoObjectFeature;

    ngAfterContentInit() {
    }
        
    ngOnChanges(changes: SimpleChanges) {
        this.onChanges(changes);
    }
    
    feature(): ymaps.IGeoObjectFeature {
        return this._feature;
    }

    options(): ymaps.IGeoObjectOptions {
        return 
    }

    toString(): string {
        return 'YaGeoObject-' + this.id;
    }

}
*/

