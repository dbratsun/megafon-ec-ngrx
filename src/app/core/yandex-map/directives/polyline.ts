import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, IPolyline, IPolylineData } from '../interfaces/igeoobject';
import { PolylineManager } from '../services/managers/polyline-manager';

@Directive({
    selector: 'ya-polyline'
})
export class YaPolyline extends YaGeoObjectBase implements IGeoObjectBase, IPolyline, OnChanges, AfterContentInit {

    @Input() geometry: number[][] | ymaps.ILineStringGeometry;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    constructor(private manager: PolylineManager) {
        super(manager)
    }

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const t = this.cursor;
    }

    toString(): string {
        return 'YaPolyline-' + this.id;
    }

    getData(): IPolylineData {
        return {
            geometry: this.geometry,
            properties: {
            },
            options: {
                cursor: this.cursor,
                draggable: this.draggable
            }
        }
    }

}


