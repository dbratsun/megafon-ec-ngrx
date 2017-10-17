// import * as benchmark from 'Benchmark';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

declare var ymaps: any;

@Injectable()
export class YandexMapsAPIWrapper {
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

    getGlobalPixelCenter(options?: ymaps.IMapMarginOptions): Promise<number[]> {
        return this._map.then((map: ymaps.Map) => map.getGlobalPixelCenter(options));
    }

    setBounds(bounds: number[][], options?: ymaps.IMapBoundsOptions): Promise<void> {
        return this._map.then((map: ymaps.Map) => map.setBounds(bounds, options));
    }

    getBounds(options?: ymaps.IMapMarginOptions): Promise<number[][]> {
        return this._map.then((map: ymaps.Map) => map.getBounds(options));
    }

    setZoom(zoom: number, options?: ymaps.IMapZoomOptions): Promise<void> {
        return this._map.then((map: ymaps.Map) => map.setZoom(zoom, options));
    }

    getZoom(): Promise<number> {
        return this._map.then((map: ymaps.Map) => map.getZoom());
    }

    getMargin(): Promise<number[]> {
        return this._map.then((map: ymaps.Map) => map.margin.getMargin());
    }

    getOffset(): Promise<number[]> {
        return this._map.then((map: ymaps.Map) => map.margin.getOffset());
    }

    getType(): Promise<string|ymaps.MapType> {
        return this._map.then((map: ymaps.Map) => map.getType());
    }

    panTo(center: number[], options?: ymaps.IMapPanOptions): Promise<void> {
        return this._map.then((map) => map.panTo(center, options));
    }

    getNativeMap(): Promise<ymaps.Map> {
        return this._map;
    }

    getOptions(): Promise<ymaps.option.Manager> {
        return this._map.then((map: ymaps.Map) => map.options);
    }

    setMapOption(key: object | string, value?: object): Promise<ymaps.option.Manager> {
        return this._map.then((map: ymaps.Map) => map.options.set(key, value));
    }

    enableMapStateBehaviors(behaviors: string[][] | string[] | string): Promise<ymaps.map.behavior.Manager> {
        return this._map.then((map: ymaps.Map) => map.behaviors.enable(behaviors));
    }

    disableMapStateBehaviors(behaviors: string[][] | string[] | string): Promise<ymaps.map.behavior.Manager> {
        return this._map.then((map: ymaps.Map) => map.behaviors.disable(behaviors));
    }

    addMapStateControl(control: ymaps.ControlKey): Promise<ymaps.control.Manager> {
        return this._map.then((map: ymaps.Map) => map.controls.add(control));
    }

    removeMapStateControl(control: ymaps.ControlKey): Promise<ymaps.control.Manager> {
        return this._map.then((map: ymaps.Map) => map.controls.remove(control));
    }

    // geoObjects

    createGeoObject(feature?: ymaps.IGeoObjectFeature, options?: ymaps.IGeoObjectOptions): Promise<ymaps.GeoObject> {
        return this._map.then((map: ymaps.Map) => {
            let o = new ymaps.GeoObject(feature, options);
            map.geoObjects.add(o);
            return o;
        })
    }

    createPlacemark(geometry: number[] | object | ymaps.IPointGeometry, properties: object | ymaps.IDataManager, options?: ymaps.IPlacemarkOptions) {
        return this._map.then((map: ymaps.Map) => {
            let p = new ymaps.Placemark(geometry, properties, options);
            map.geoObjects.add(p);
            return p;
        })
    }

}

