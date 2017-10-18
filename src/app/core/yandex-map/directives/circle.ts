import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, ICircle, ICircleData } from '../interfaces/igeoobject';
import { CircleManager } from '../services/managers/circle-manager';

@Directive({
    selector: 'ya-circle'
})
export class YaCircle extends YaGeoObjectBase implements IGeoObjectBase, ICircle, OnChanges, AfterContentInit {

    // @Input() geometry: ymaps.ICircleGeometry[][][][] | number[][];
    @Input() coordinates: number[];
    @Input() radius: number;
    @Input() circleOverlay: string = 'default#circle';
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    constructor(private manager: CircleManager) {
        super(manager)
    }

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const t = this.cursor;
    }

    toString(): string {
        return 'YaCircle-' + this.id;
    }

    getData(): ICircleData {
        return {
            geometry: [this.coordinates, this.radius],
            properties: {
            },
            options: {
                circleOverlay: this.circleOverlay,
                cursor: this.cursor,
                draggable: this.draggable
            }
        }
    }

}


