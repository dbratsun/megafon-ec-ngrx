import { Injectable, Directive, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Marker, MarkerWrapper } from './testwrapper';
// import { BaseObject, ChildObject } from './testobjects';
import { IBaseObject } from './testinterfaces';

@Injectable()
export class Manager {
    protected list: Map<IBaseObject, Promise<Marker>> = new Map<IBaseObject, Promise<Marker>>();

    constructor(private _wrapper: MarkerWrapper) {}

    createObject(tObject: IBaseObject) {
        if (tObject.getName() == 'ChildObject') {
            const objectPromise = this._wrapper.addMarker({
                position: 1,
                title: 'test'
            })
            this.list.set(tObject, objectPromise)
        }
    }
    
}
