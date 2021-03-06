import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, IPlacemark, IPlacemarkData } from '../interfaces/igeoobject';
import { PlacemarkManager } from '../services/managers/placemark-manager';

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


