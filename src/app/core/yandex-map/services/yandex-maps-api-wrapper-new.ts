import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
// import { SetCenterOptions, GetOptions, PanToOptions } from "./yandex-maps-types";
// import * as ymaps from 'ymaps';

// const ymaps =  require('@types/yandex-maps');
// <reference path="@types/yandex-maps" />
// declare var ymaps: any;

import * as ymaps from 'yandex-maps';
import * as fs from 'http';

@Injectable()
export class YandexMapsAPIWrapperNew {
    private _map: Promise<ymaps.Map>;
    private _mapResolver: (value?: ymaps.Map) => void;

    constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
        this._map =
            new Promise<ymaps.Map>((resolve: () => void) => { this._mapResolver = resolve; });
    }

    createMap(el: HTMLElement, mapState: ymaps.IMapState, mapOptions: ymaps.IMapOptions): Promise<void> {
        let res = this._loader.load().then(() => {
            let create = () => setTimeout(() =>  {
                if(ymaps.Map)  {
                const map = new ymaps.Map(el, mapState, mapOptions);
                this._mapResolver(<ymaps.Map>map);
                }
                else{
                create();
                }
            }, 100);
            create(); 
        }).catch(e => console.log(e));
        return res;
    }
           
    subscribeToMapEvent<E>(eventName: string): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
          this._map.then((m: ymaps.Map) => {
            m.events.add(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
          });
        });
      }
   
    setCenter(center: number[], zoom?: number, options?: ymaps.IMapPositionOptions): Promise<void> {
        return this._map.then((map: ymaps.Map) => map.setCenter(center, zoom, options))
    }
   
    getCenter(options?: ymaps.IMapMarginOptions): Promise<number[]> {
        return this._map.then((map: ymaps.Map) => map.getCenter(options));
    }
   
    panTo(center: number[], options?: ymaps.IMapPanOptions): Promise<void> {
        return this._map.then((map) => map.panTo(center, options));
    }
    
}