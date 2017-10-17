import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output, Inject, Injector, Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { GeoObjectManager } from '../services/managers/geoobject-manager';
import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

let geoObjectId = 0;

@Injectable()
export abstract class YaGeoObjectBase implements OnDestroy {

    private _id: string;
    private _addedToManager: boolean = false;
    private _observableSubscriptions: Subscription[] = [];
    
    constructor(protected _geoObjectManager: GeoObjectManager) {
        this._id = (geoObjectId++).toString();
    }
    
    ngOnDestroy() {
        this._geoObjectManager.deleteGeoObject(this);
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    id(): string {
        return this._id;
    }

    protected onChanges(changes: SimpleChanges) {
        if (!this._addedToManager) {
            this._geoObjectManager.addGeoObject(this);
            this._addedToManager = true;
        }
    }

    abstract toString(): string;    

    abstract createGeoObject(): Promise<ymaps.GeoObject>
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

@Directive({
    selector: 'ya-placemark-1'
})
export class YaPlacemark1 extends YaGeoObjectBase implements OnChanges, AfterContentInit {

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.onChanges(changes);
    }

    toString(): string {
        return 'YaPlacemark-' + this.id;
    }
            
    createGeoObject(): Promise<ymaps.Placemark> {
        return this._geoObjectManager.mapsWrapper().createPlacemark(
            [this.latitude, this.longitude],
            {
            },
            {
                cursor: this.cursor,
                draggable: this.draggable
            }
        )

    }

}