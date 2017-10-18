import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, IPlacemark, IPlacemarkData } from '../interfaces/igeobject';
import { PlacemarkManager } from '../services/managers/placemark-manager';

// import { PlacemarkManager } from '../services/managers/placemark-manager';
// import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

let placemarkId = 0;

@Directive({
    selector: 'ya-placemark'
})
export class YaPlacemark extends YaGeoObjectBase implements IGeoObjectBase, IPlacemark, OnChanges, AfterContentInit {

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    constructor(private manager: PlacemarkManager) {
        super(manager)
    }

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const t = this.cursor;
    }

    toString(): string {
        return 'YaPlacemark-' + this.id;
    }

    getData(): IPlacemarkData {
        return {
            geometry: [this.latitude, this.longitude],
            properties: {
            },
            options: {
                cursor: this.cursor,
                draggable: this.draggable
            }
        }
    }

}


/*
@Directive({
    selector: 'ya-placemark'
})
export class YaPlacemark implements OnChanges, AfterContentInit {

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    private _id: string;
    private _placemarkAddedToManager: boolean = false;
    private _observableSubscriptions: Subscription[] = [];
    
    ngOnDestroy() {
        this._placemarkManager.deleteGeoObject(this);
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    id(): string {
        return this._id;
    }
    
    constructor(private _placemarkManager: PlacemarkManager) {
        this._id = (placemarkId++).toString();
    }


    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._placemarkAddedToManager) {
            this._placemarkManager.addGeoObject(this);
            this._placemarkAddedToManager = true;
        }
    }

    toString(): string {
        return 'YaPlacemark-' + this.id;
    }
}
*/

