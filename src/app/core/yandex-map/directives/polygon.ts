import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, IPolygon, IPolygonData } from '../interfaces/igeoobject';
import { PolygonManager } from '../services/managers/polygon-manager';

@Directive({
    selector: 'ya-polygon'
})
export class YaPolygon extends YaGeoObjectBase implements IGeoObjectBase, IPolygon, OnChanges, AfterContentInit {

    @Input() geometry: number[][][] | ymaps.IPolygonGeometry;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    constructor(private manager: PolygonManager) {
        super(manager)
    }

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const t = this.cursor;
    }

    toString(): string {
        return 'YaPolygon-' + this.id;
    }

    getData(): IPolygonData {
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


