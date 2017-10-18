import { Directive, EventEmitter, OnChanges, OnDestroy, AfterContentInit, SimpleChanges, Input, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { YaGeoObjectBase } from '../directives/geoobjectbase';
import { IGeoObjectBase, IRectangle, IRectangleData } from '../interfaces/igeoobject';
import { RectangleManager } from '../services/managers/rectangle-manager';

@Directive({
    selector: 'ya-rectangle'
})
export class YaRectangle extends YaGeoObjectBase implements IGeoObjectBase, IRectangle, OnChanges, AfterContentInit {

    @Input() geometry: number[][] | ymaps.IRectangleGeometry;
    @Input() cursor: string = 'pointer';
    @Input() draggable: boolean = false;

    constructor(private manager: RectangleManager) {
        super(manager)
    }

    ngAfterContentInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        const t = this.cursor;
    }

    toString(): string {
        return 'YaRectangle-' + this.id;
    }

    getData(): IRectangleData {
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


