import { Injectable, Directive, Component, Input, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { Marker, MarkerWrapper } from './testwrapper';
import { Manager, ManagerNewBase, ChildObjectManagerNew } from './testmanager';
import { IBaseObject, IBaseObjectData, IChildObject, IChildObjectData } from './testinterfaces';

@Injectable()
export abstract class BaseObject implements IBaseObject, DoCheck {
    private _addedToManager: boolean = false;

    constructor(protected _manager: ManagerNewBase) {
    }

    getName(): string {
        return 'BaseObject';
    }

    abstract getData(): IBaseObjectData; 

    // todo: check the performance !
    ngDoCheck() {
        this.changesIntern();        
    }

    protected changesIntern() {
        if (!this._addedToManager) {
            this._manager.createObject(this);
            this._addedToManager = true;
        }    
    }
}

@Directive({
    selector: 'child-object'
})
export class ChildObject extends BaseObject implements OnChanges, IChildObject {
    @Input() position: number = 0;
    @Input() title: string = '';

    constructor(_manager: ChildObjectManagerNew) {
        super(_manager);
    }

    ngOnChanges(changes: SimpleChanges) {   
        const t = this.title;
        // this.changesIntern();
    }

    getName(): string {
        return 'ChildObject';
    }

    getData(): IChildObjectData {
        return {
            position: this.position,
            title: this.title
        }
    }
}

@Component({
    selector: 'map-object',
    providers: [MarkerWrapper, Manager, ChildObjectManagerNew],
    template: `
        <div class="map-object-content">
            <ng-content></ng-content>
        </div>
    `
}) 
export class MapObject {

}