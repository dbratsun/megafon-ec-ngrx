import { Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, Input, Output } from '@angular/core';
import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

import * as mapTypes from '../services/yandex-maps-types';
import { Subscription } from "rxjs/Subscription";


@Component({
    selector: 'ya-map',
    providers: [YandexMapsAPIWrapper],
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
export class YaMap implements OnChanges, OnInit, OnDestroy {
    @Input() longitude: number = 0;
    @Input() latitude: number = 0;
    @Input() zoom: number = 8;
    @Input() minZoom: number;
    @Input() maxZoom: number;
    @Input() mapTypeId: 'yandex#map'|'yandex#hybrid'|'yandex#satellite'|string = 'yandex#map';
    
    private mapInit: boolean = false;
    private _observableSubscriptions: Subscription[] = [];

    @Output() mapClick: EventEmitter<mapTypes.MapClickMouseEvent> = new EventEmitter<mapTypes.MapClickMouseEvent>();
    @Output() mapRightClick: EventEmitter<mapTypes.MapClickMouseEvent> = new EventEmitter<mapTypes.MapClickMouseEvent>();
    @Output() mapDblClick: EventEmitter<mapTypes.MapClickMouseEvent> = new EventEmitter<mapTypes.MapClickMouseEvent>();
    
    constructor(private _elem: ElementRef, private _mapsWrapper: YandexMapsAPIWrapper) {}
    
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
        this._mapsWrapper.setCenter(newCenter);
    }
    


    private _initMapInstance(el: HTMLElement) {
        this._mapsWrapper.createMap(el, {
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            center: [this.latitude, this.longitude],
            mapTypeId: this.mapTypeId
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
          const s = this._mapsWrapper.subscribeToMapEvent<{latLng: mapTypes.LatLng}>(e.name).subscribe(
              (event: {latLng: mapTypes.LatLng}) => {
                const value = <mapTypes.MapClickMouseEvent>{lat: event.latLng.lat(), lng: event.latLng.lng()};
                e.emitter.emit(value);
              });
          this._observableSubscriptions.push(s);
        });
      }

}