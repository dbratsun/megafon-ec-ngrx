import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
} from '@angular/core';
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
        <div class='ya-map-container-inner'></div>
        <div class='ya-map-content'>
            <ng-content></ng-content>
        <div>
    `
})
export class YaMap implements OnChanges, OnInit, OnDestroy {
    @Input() longitude: number = 0;
    @Input() latitude: number = 0;

    // state properties
    @Input() behaviors: ymaps.BehaviorsType[] = ['default'];
    @Input() bounds: number[][];
    @Input() controls: ymaps.ControlType[] = ['default'];
    @Input() margin: number[][]|number[];
    @Input() type: ymaps.MapStateType = 'yandex#map';
    @Input() zoom: number = 8;

    // options properties
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

    @Input() useMapMargin: boolean = false; // for using in getGlobalPixelCenter as parameter

    private static _inputMapOptions: string[] = [
        'autoFitToViewport', 'avoidFractionalZoom', 'exitFullscreenByEsc', 'fullscreenZIndex',
        'mapAutoFocus', 'maxAnimationZoomDifference', 'maxZoom', 'minZoom', 'nativeFullscreen',
        'suppressMapOpenBlock', 'suppressObsoleteBrowserNotifier', 'yandexMapAutoSwitch', 'yandexMapDisablePoiInteractivity'
    ]

    private static _inputMapBehaviors: ymaps.BehaviorsType[] = [
        'default', 'drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier',
        'leftMouseButtonMagnifier','ruler','routeEditor'
    ];

    private mapInit: boolean = false;
    private _observableSubscriptions: Subscription[] = [];

    @Output() mapClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapRightClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();
    @Output() mapDblClick: EventEmitter<MapClickMouseEvent> = new EventEmitter<MapClickMouseEvent>();

    @Output() centerChange: EventEmitter<ymaps.LatLng> = new EventEmitter<ymaps.LatLng>();
    @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() globalPixelCenterChange: EventEmitter<ymaps.LatLng> = new EventEmitter<ymaps.LatLng>();
    @Output() boundsChange: EventEmitter<number[][]> = new EventEmitter<number[][]>();

    @Output() actionBegin: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() actionBreak: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() actionEnd: EventEmitter<Object> = new EventEmitter<Object>();

    @Output() marginChange: EventEmitter<ymaps.map.margin.MarginOffsetInfo> = new EventEmitter<ymaps.map.margin.MarginOffsetInfo>();
    @Output() typeChange: EventEmitter<string> = new EventEmitter<string>();

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
            this._updateMapOptionsChanges(changes);
            this._updateMapStateBehaviorsChanges(changes);
            this._updatePosition(changes);
        }
    }

    private _updateMapOptionsChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (YaMap._inputMapOptions.indexOf(propName) !== -1) {
                this._mapsWrapper.setMapOption(propName, changes[propName].currentValue).then((manager: ymaps.option.Manager) => {
                    this._mapsWrapper.getOptions().then((manager: ymaps.option.Manager) => {
                        const m = manager;
                    })
                })
            }
        }
    }

    private _updateMapStateBehaviorsChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === 'behaviors') {
                this._mapsWrapper.disableMapStateBehaviors(YaMap._inputMapBehaviors).then((manager: ymaps.map.behavior.Manager) => {
                    this._mapsWrapper.enableMapStateBehaviors(changes[propName].currentValue).then((manager: ymaps.map.behavior.Manager) => {
                        const m = manager;
                    })
                })
            }
        }
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
        this._handleMapBoundsChange();
        this._handleMapActionBegin();
        this._handleMapActionBreak();
        this._handleMapActionEnd();
        this._handleMarginChange();
        this._handleTypeChange();
        // this._handleMapMouseEvents();
    }

    private _handleMapBoundsChange() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('boundschange').subscribe((event: ymaps.IEvent) => {
            if (event.get('newZoom') !== event.get('oldZoom')) {
                this._mapsWrapper.getZoom().then((zoom: number) => {
                    this.zoomChange.emit(zoom);
                });
            }
            if (event.get('newCenter') !== event.get('oldCenter')) {
                this._mapsWrapper.getCenter().then((center: number[]) => {
                    this.centerChange.emit(<ymaps.LatLng>{lat: center[0], lng: center[1]});
                });
            }
            if (event.get('oldGlobalPixelCenter') !== event.get('newGlobalPixelCenter')) {
                this._mapsWrapper.getGlobalPixelCenter(this.useMapMargin).then((center: number[]) => {
                    this.globalPixelCenterChange.emit(<ymaps.LatLng>{lat: center[0], lng: center[1]});
                });
            }
            if (event.get('newBounds') !== event.get('oldBounds')) {
                this._mapsWrapper.getBounds(this.useMapMargin).then((bounds: number[][]) => {
                    this.boundsChange.emit(bounds);
                });
            }
        });
        this._observableSubscriptions.push(s);
    }

    private _handleMapActionBegin() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('actionbegin').subscribe((event: ymaps.IEvent) => {
            let action = event.get('action');
            this.actionBegin.emit(event.get('action'));
        })
        this._observableSubscriptions.push(s);
    }

    private _handleMapActionBreak() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('actionbreak').subscribe((event: ymaps.IEvent) => {
            let action = event.get('action');
            this.actionBreak.emit(event.get('action'));
        })
        this._observableSubscriptions.push(s);
    }

    private _handleMapActionEnd() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('actionend').subscribe((event: ymaps.IEvent) => {
            let action = event.get('action');
            this.actionEnd.emit(event.get('action'));
        })
        this._observableSubscriptions.push(s);
    }

    // todo: actiontick, actiontickcomplete

    // todo: balloonclose, balloonopen

    // todo: destroy

    // todo: hintclose, hintopen

    private _handleMarginChange() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('marginchange').subscribe((event: ymaps.IEvent) => {
            let _margin: number[] = [];
            this._mapsWrapper.getMargin().then((margin: number[]) => {
                _margin = margin;
            })
            let _offset: number[] = [];
            this._mapsWrapper.getOffset().then((offset: number[]) => {
                _offset = offset;
            })
            this.marginChange.emit(<ymaps.map.margin.MarginOffsetInfo>{margin: _margin, offset: _offset})
        })
        this._observableSubscriptions.push(s);
    }

    // todo: optionschange

    // todo: sizechange

    private _handleTypeChange() {
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('typechange').subscribe((event: ymaps.IEvent) => {
            this._mapsWrapper.getType().then((type: string) => {
                this.type = type as ymaps.MapStateType;
                this.typeChange.emit(type);
            })
        })
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
