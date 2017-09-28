import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import * as mapTypes from './yandex-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

declare var ymaps: any;

@Injectable()
export class YandexMapsAPIWrapper {
    private _map: Promise<mapTypes.YandexMap>;
    private _mapResolver: (value?: mapTypes.YandexMap) => void;

    constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
        this._map =
            new Promise<mapTypes.YandexMap>((resolve: () => void) => { this._mapResolver = resolve; });
    }

    /*
    createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void> {
        return this._loader.load().then(() => {
          const map = new ymaps.maps.Map(el, mapOptions);
          this._mapResolver(<mapTypes.YandexMap>map);
          return;
        });
    }
    */

    createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void> {
        let res = this._loader.load().then(() => {
            let create = () => setTimeout(() =>  {
                if(ymaps.Map)  {
                const map = new ymaps.Map(el, mapOptions);
                this._mapResolver(<mapTypes.YandexMap>map);
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
          this._map.then((m: mapTypes.YandexMap) => {
            m.events.add(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
          });
        });
      }

    setMapOptions(options: mapTypes.MapOptions) {
        this._map.then((m: mapTypes.YandexMap) => { m.setOptions(options); });
    }
    
    setCenter(latLng: mapTypes.LatLngLiteral): Promise<void> {
        return this._map.then((map: mapTypes.YandexMap) => map.setCenter(latLng));
    }
    
    getCenter(): Promise<mapTypes.LatLng> {
        return this._map.then((map: mapTypes.YandexMap) => map.getCenter());
    }
    
    panTo(latLng: mapTypes.LatLng|mapTypes.LatLngLiteral): Promise<void> {
        return this._map.then((map) => map.panTo(latLng));
    }
    
}