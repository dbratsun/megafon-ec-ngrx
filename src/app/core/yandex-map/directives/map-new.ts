import { Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, Input, Output } from '@angular/core';
import { YandexMapsAPIWrapperNew } from '../services/yandex-maps-api-wrapper-new';

// import * as mapTypes from '../services/yandex-maps-types';
import { Subscription } from "rxjs/Subscription";

type BehaviorsType = 
    'default'|'drag'|'scrollZoom'|'dblClickZoom'|'multiTouch'|'rightMouseButtonMagnifier'|
    'leftMouseButtonMagnifier'|'ruler'|'routeEditor';

type ControlType = 
    'fullscreenControl'|'geolocationControl'|'routeEditor'|'rulerControl'|'searchControl'|'trafficControl'|
    'typeSelector'|'zoomControl'|'smallMapDefaultSet'|'mediumMapDefaultSet'|'largeMapDefaultSet'|'default';

type MapType = 'yandex#map'|'yandex#satellite'|'yandex#hybrid'; 

export interface MapClickMouseEvent { lat: number, lng: number}

@Component({
    selector: 'ya-map',
    providers: [YandexMapsAPIWrapperNew],
    styles: [`
        .ya-map-container-inner {
            width: inherit;
            height: inherit;
        }
        .ya-map-content {
            display: none;
        }
    `],
    template: `
        <div class='ya-map-container-inner'><div>
        <div class='ya-map-content'>
            <ng-content></ng-content>
        <div>
    `
})
export class YaMapNew implements OnChanges, OnInit, OnDestroy {
    @Input() behaviors: BehaviorsType[] = ['default'];
    @Input() bounds: number[][];
    @Input() longitude: number = 0;
    @Input() latitude: number = 0;
    @Input() controls: ControlType[] = ['default'];
    @Input() margin: number[][]|number[];
    @Input() type: MapType = 'yandex#map';
    @Input() zoom: number = 8;
    @Input() minZoom: number;
    @Input() maxZoom: number;
    
    private mapInit: boolean = false;
    private _observableSubscriptions: Subscription[] = [];

    @Output() mapClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapRightClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapDblClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    
    constructor(private _elem: ElementRef, private _mapsWrapper: YandexMapsAPIWrapperNew) {}
    
    ngOnInit() {
        const container = this._elem.nativeElement.querySelector('.ya-map-container-inner');
        this._initMapInstance(container);
        this.mapInit = true;
    }

    ngOnDestroy() {
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.mapInit) {
            // this._updateMapOptionsChanges(changes);
            this._updatePosition(changes);
        }
      }

    private _updateMapOptionsChanges(changes: SimpleChanges) {
        let options: {[propName: string]: any} = {};

    }  

    private _updatePosition(changes: SimpleChanges) {
        if (changes['latitude'] == null && changes['longitude'] == null) {
            return;
        }
        this._setCenter();
    }
      
    private _setCenter() {
        let newCenter = {
          lat: this.latitude,
          lng: this.longitude,
        };
        /*
        if (this.usePanning) {
          this._mapsWrapper.panTo(newCenter);
        } else {
          this._mapsWrapper.setCenter(newCenter);
        }
        */
        this._mapsWrapper.setCenter([this.latitude, this.longitude]);
    }
    


    private _initMapInstance(el: HTMLElement) {
        this._mapsWrapper.createMap(el, {
            behaviors: this.behaviors,
            bounds: this.bounds,
            center: [this.latitude, this.longitude],
            controls: this.controls,
            margin: this.margin,
            type: this.type,
            zoom: this.zoom
        }, 
        {
            minZoom: this.minZoom,
            maxZoom: this.maxZoom
        });
        this._handleMapMouseEvents();
    }

    private _handleMapMouseEvents() {
        interface Emitter {
          emit(value: any): void;
        }
        type Event = {name: string, emitter: Emitter};
    
        const events: Event[] = [
          {name: 'click', emitter: this.mapClick},
          {name: 'rightclick', emitter: this.mapRightClick},
          {name: 'dblclick', emitter: this.mapDblClick},
        ];
    
        events.forEach((e: Event) => {
          const s = this._mapsWrapper.subscribeToMapEvent<{latLng: number[]}>(e.name).subscribe(
              (event: {latLng: number[]}) => {
                const value = <MapClickMouseEvent>{lat: event.latLng[0], lng: event.latLng[1]};
                e.emitter.emit(value);
              });
          this._observableSubscriptions.push(s);
        });
      }

}