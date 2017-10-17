import { Injectable, Directive, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Marker, MarkerWrapper } from './testwrapper';
import { Manager } from './testmanager';
import { IBaseObject } from './testinterfaces';

@Injectable()
export abstract class BaseObject implements IBaseObject {
    constructor(protected _manager: Manager) {
    }

    getName(): string {
        return 'BaseObject';
    }
}

@Directive({
    selector: 'child-object'
})
export class ChildObject extends BaseObject implements OnChanges, IBaseObject {
    @Input() position: number = 0;
    @Input() title: string = '';

    private _addedToManager: boolean = false;

    ngOnChanges(changes: SimpleChanges) {   
        if (!this._addedToManager) {
            this._manager.createObject(this);
            this._addedToManager = true;
        }
    }

    getName(): string {
        return 'ChildObject';
    }
}

@Component({
    selector: 'map-object',
    providers: [MarkerWrapper, Manager],
    template: `
        <div class="map-object-content">
            <ng-content></ng-content>
        </div>
    `
}) 
export class MapObject {

}