import { Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, Input, Output } from '@angular/core';
import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

// import * as mapTypes from '../services/yandex-maps-types';
import { Subscription } from "rxjs/Subscription";

export interface MapClickMouseEvent { lat: number, lng: number}

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
    @Input() behaviors: ymaps.BehaviorsType[] = ['default'];
    @Input() bounds: number[][];
    @Input() longitude: number = 0;
    @Input() latitude: number = 0;
    @Input() controls: ymaps.ControlType[] = ['default'];
    @Input() margin: number[][]|number[];
    @Input() type: ymaps.MapStateType = 'yandex#map';
    @Input() zoom: number = 8;

    @Input() autoFitToViewport: ymaps.AutoFitToViewportType = 'ifNull';
    @Input() avoidFractionalZoom: boolean = true;
    @Input() exitFullscreenByEsc: boolean = true;
    @Input() fullscreenZIndex: number = 10000;
    @Input() mapAutoFocus: boolean = true;
    @Input() maxAnimationZoomDifference: number = 5;
    @Input() maxZoom: number = 23;
    @Input() minZoom: number = 0;
    @Input() nativeFullscreen: boolean = false;
    // @Input() projection
    // @Input() restrictMapArea: boolean[][][][]|number[][] = [[[[false]]]];
    @Input() suppressMapOpenBlock: boolean = false;
    @Input() suppressObsoleteBrowserNotifier: boolean = false;
    @Input() yandexMapAutoSwitch: boolean = true;
    @Input() yandexMapDisablePoiInteractivity: boolean = false;

    private mapInit: boolean = false;
    private _observableSubscriptions: Subscription[] = [];

    @Output() mapClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapRightClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapDblClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();

    @Output() centerChange: EventEmitter<ymaps.LatLng> = new EventEmitter<ymaps.LatLng>();
    @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();

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
            autoFitToViewport: this.autoFitToViewport,
            avoidFractionalZoom: this.avoidFractionalZoom,
            exitFullscreenByEsc: this.exitFullscreenByEsc,
            fullscreenZIndex: this.fullscreenZIndex,
            mapAutoFocus: this.mapAutoFocus,
            maxAnimationZoomDifference: this.maxAnimationZoomDifference,
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            nativeFullscreen: this.nativeFullscreen,
            // projection
            // restrictMapArea: this.restrictMapArea,
            suppressMapOpenBlock: this.suppressMapOpenBlock,
            suppressObsoleteBrowserNotifier: this.suppressObsoleteBrowserNotifier,
            yandexMapAutoSwitch: this.yandexMapAutoSwitch,
            yandexMapDisablePoiInteractivity: this.yandexMapDisablePoiInteractivity
        })
            .then(() => this._mapsWrapper.getNativeMap())
            .then(map => this.mapReady.emit(map));
        this._handleMapCenterChange();
        // this._handleMapMouseEvents();
    }

    private _handleMapCenterChange() {
      const s = this._mapsWrapper.subscribeToMapEvent<void>('boundschange').subscribe(() => {
        this._mapsWrapper.getCenter().then((center: number[]) => {
          this.latitude = center[0];
          this.longitude = center[1];
          this.centerChange.emit(<ymaps.LatLng>{lat: this.latitude, lng: this.longitude});
        });
      });
    this._observableSubscriptions.push(s);
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
