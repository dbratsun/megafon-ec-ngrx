import { Injectable, Directive, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Marker, MarkerWrapper } from './testwrapper';
// import { BaseObject, ChildObject } from './testobjects';
import { IBaseObject, IChildObjectData, IChildObject } from './testinterfaces';

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

@Injectable()
export abstract class ManagerNewBase {
    protected list: Map<IBaseObject, Promise<Marker>> = new Map<IBaseObject, Promise<Marker>>();
    constructor(protected _wrapper: MarkerWrapper) {}    
    abstract createObject(_object: IBaseObject);
}

@Injectable()
export class ChildObjectManagerNew extends ManagerNewBase {
    createObject(_object: IBaseObject) {
        const data: IChildObjectData = _object.getData() as IChildObjectData;
        const objectPromise = this._wrapper.addMarker({
            position: data.position,
            title: data.title
        })
        this.list.set(_object, objectPromise)
    }
}


