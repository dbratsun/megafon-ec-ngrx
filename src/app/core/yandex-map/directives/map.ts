import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { YandexMapsAPIWrapper } from '../services/yandex-maps-api-wrapper';

// import * as mapTypes from '../services/yandex-maps-types';
import { Subscription } from "rxjs/Subscription";

export enum MouseEventType {
  click, dblClick, mousedown, mouseenter, mouseleave, mousemove, mouseup, wheel
}

export interface MouseEvent {
    type: MouseEventType;
    name: string;
    coords: number[];
    globalPixels: number[];
    pagePixels: number[];
    clientPixels: number[];
}

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
    @Input() controls: ymaps.ControlKey[] = ['default'];
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

    // center options
    @Input() centerCheckZoomRange: boolean = false;
    @Input() centerDuration: number = 0;
    @Input() centerTimingFunction: string = 'linear';
    @Input() centerUseMapMargin: boolean = false;

    // pan options
    @Input() panCheckZoomRange: boolean = false;
    @Input() panDelay: number = 1000;
    @Input() panDuration: number = 500;
    @Input() panFlying: boolean = true;
    @Input() panSafe: boolean = true;
    @Input() panTimingFunction: string = 'ease-in-out';
    @Input() panUseMapMargin: boolean = false;

    // bounds options
    @Input() boundsCheckZoomRange: boolean = false;
    @Input() boundsDuration: number = 0;
    @Input() boundsPreciseZoom: boolean = false;
    @Input() boundsTimingFunction: string = 'linear';
    @Input() boundsUseMapMargin: boolean = false;
    @Input() boundsZoomMargin: number[][] | number[] = [0];

    @Input() useMapMargin: boolean = false; // for using in getGlobalPixelCenter as parameter

    private static _inputMapOptions: string[] = [
        'autoFitToViewport', 'avoidFractionalZoom', 'exitFullscreenByEsc', 'fullscreenZIndex',
        'mapAutoFocus', 'maxAnimationZoomDifference', 'maxZoom', 'minZoom', 'nativeFullscreen',
        'suppressMapOpenBlock', 'suppressObsoleteBrowserNotifier', 'yandexMapAutoSwitch', 'yandexMapDisablePoiInteractivity'
    ]

    private static _inputMapControls: ymaps.ControlType[] = [
      'fullscreenControl', 'geolocationControl', 'routeEditor', 'rulerControl', 'searchControl',
      'trafficControl', 'typeSelector', 'zoomControl', 'smallMapDefaultSet', 'mediumMapDefaultSet', 'largeMapDefaultSet', 'default'
    ]

    private static _inputMapBehaviors: ymaps.BehaviorsType[] = [
        'default', 'drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier',
        'leftMouseButtonMagnifier','ruler','routeEditor'
    ];

    private mapInit: boolean = false;
    private _observableSubscriptions: Subscription[] = [];

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

    @Output() mouseEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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
            this._updateCenter(changes);
            this._updateZoom(changes);
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
                if ((propName === 'minZoom') && (changes[propName].currentValue > this.zoom)) {
                  this.zoom = changes[propName].currentValue;
                  this._setZoom(changes[propName].currentValue);
                }
                if ((propName === 'maxZoom') && (changes[propName].currentValue < this.zoom)) {
                  this.zoom = changes[propName].currentValue;
                  this._setZoom(changes[propName].currentValue);
                }
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
            if (propName === 'controls') {
                YaMap._inputMapControls.forEach(control => {
                    this._mapsWrapper.removeMapStateControl(control).then(() => {})
                });
                (changes[propName].currentValue as string[]).forEach(control => {
                    this._mapsWrapper.addMapStateControl(control as ymaps.ControlKey).then(() => {})
                })
            }
        }
    }

    private _updateCenter(changes: SimpleChanges) {
        if (changes['latitude'] == null && changes['longitude'] == null) {
            return;
        }
        this._setCenter(changes['latitude'].currentValue, changes['longitude'].currentValue);
    }

    private _updateZoom(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === 'zoom') {
                this._setZoom(changes[propName].currentValue)
            }
        }
    }

    public setZoom(zoom: number, options?: ymaps.IMapZoomOptions) {
        this._setZoom(zoom, options);
    }    

    private _setZoom(zoom: number, options?: ymaps.IMapZoomOptions) {
        if (zoom !== this.zoom) {
            this._mapsWrapper.setZoom(zoom, options);
            this.zoom = zoom;
            this.zoomChange.emit(zoom);
        }
    }

    private _setCenter(latitude: number, longitude: number, zoom?: number) {
        if ((latitude !== this.latitude) || (longitude !== this.longitude) || (zoom !== this.zoom)) {
            const options: ymaps.IMapPositionOptions = {
                checkZoomRange: this.centerCheckZoomRange,
                duration: this.centerDuration,
                timingFunction: this.centerTimingFunction,
                useMapMargin: this.centerUseMapMargin
            }
            const zoomChanged: boolean = ((zoom !== this.zoom) && (zoom !== undefined));
            if (zoomChanged) {
                this._setZoom(zoom);
            }
            this._mapsWrapper.setCenter([latitude, longitude])
            this.latitude = latitude;
            this.longitude = longitude;
            this.centerChange.emit({lat: latitude, lng: longitude});
        }
    }   

    public setCenter(latitude: number, longitude: number) {
        this._setCenter(latitude, longitude);
    }

    private _panTo(center: number[]) {
        const options: ymaps.IMapPanOptions = {
            checkZoomRange: this.panCheckZoomRange,
            delay: this.panDelay,
            duration: this.panDuration,
            flying: this.panFlying,
            safe: this.panSafe,
            timingFunction: this.panTimingFunction,
            useMapMargin: this.panUseMapMargin 
        }
        this._mapsWrapper.panTo(center, options);
    }

    public panTo(center: number[]) {
        this._panTo(center);
    }

    private _getBounds(): number[][] {
        const options: ymaps.IMapBoundsOptions = {
            useMapMargin: this.boundsUseMapMargin
        }
        let bounds: number[][] = [];
        this._mapsWrapper.getBounds(options).then((value: number[][]) => {
            bounds = value;;
        });
        return bounds;
    }

    public getBounds(): number[][] {
        return this._getBounds();
    }

    private _setBounds(bounds: number[][]) {
        if(bounds !== this.bounds) {
            const options: ymaps.IMapBoundsOptions = {
                checkZoomRange: this.boundsCheckZoomRange,
                duration: this.boundsDuration,
                preciseZoom: this.boundsPreciseZoom,
                timingFunction: this.boundsTimingFunction,
                useMapMargin: this.boundsUseMapMargin,
                zoomMargin: this.boundsZoomMargin
            }
            this._mapsWrapper.setBounds(bounds, options);
            this.bounds = bounds;
        }
    }

    public setBounds(bounds: number[][]) {
        this._setBounds(bounds);
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
        this._handleMapActionBegin();
        this._handleMapActionBreak();
        this._handleMapActionEnd();
        this._handleMapBoundsChange();
        /*
        this._handleClick();
        this._handleDblClick();
        this._handleMarginChange();
        this._handleMouseDown();
        this._handleMouseEnter();
        this._handleMouseLeave();
        this._handleMouseMove();
        this._handleMouseUp();
        */
        this._handleTypeChange();
        /*
        this._handleWheel();
        */
        this._handleMapMouseEvents();
    }

    // Event handler

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

    private _handleMapBoundsChange() {
      const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('boundschange').subscribe((event: ymaps.IEvent) => {
          if (event.get('newZoom') !== event.get('oldZoom')) {
              this._mapsWrapper.getZoom().then((zoom: number) => {
                  this._setZoom(zoom);
              });
          }
          if (event.get('newCenter') !== event.get('oldCenter')) {
              this._mapsWrapper.getCenter().then((center: number[]) => {
                  this._setCenter(center[0], center[1]);  
              });
          }
          if (event.get('oldGlobalPixelCenter') !== event.get('newGlobalPixelCenter')) {
              this._mapsWrapper.getGlobalPixelCenter({useMapMargin: this.useMapMargin}).then((center: number[]) => {
                  this.globalPixelCenterChange.emit(<ymaps.LatLng>{lat: center[0], lng: center[1]});
              });
          }
          if (event.get('newBounds') !== event.get('oldBounds')) {
              this._mapsWrapper.getBounds({useMapMargin: this.useMapMargin}).then((bounds: number[][]) => {
                  this.boundsChange.emit(bounds);
              });
          }
      });
      this._observableSubscriptions.push(s);
    }

    // click, s. _handleMapMouseEvents
    /*
    private _handleClick() {
        const s = this._mapsWrapper.subscribeToMapEvent<any>('click').subscribe((event: any) => {
          let action = event.get('type');
          let coords = event.get('coords');
          let globalPixels = event.get('globalPixels');
          let pagePixels = event.get('pagePixels');
          let clientPixels = event.get('clientPixels');
        })
        this._observableSubscriptions.push(s);
    }
    */

    // todo: contextmenu

    // dblClick, s. _handleMapMouseEvents
    /*
    private _handleDblClick() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('dblclick').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }
    */

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

    // mouseDown, mouseEnter, mouseLeave, mouseMove, mouseUp s. _handleMapMouseEvents
    /*
    private _handleMouseDown() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('mousedown').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }

    private _handleMouseEnter() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('mouseenter').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }

    private _handleMouseLeave() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('mouseleave').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }

    private _handleMouseMove() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('mousemove').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }
    private _handleMouseUp() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('mouseup').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }
    */

    // todo: multitouchend, multitouchmove, multitouchstart

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

    // wheel s. _handleMapMouseEvents
    private _handleWheel() {
      const s = this._mapsWrapper.subscribeToMapEvent<any>('wheel').subscribe((event: any) => {
        let action = event.get('type');
        let coords = event.get('coords');
        let globalPixels = event.get('globalPixels');
        let pagePixels = event.get('pagePixels');
        let clientPixels = event.get('clientPixels');
      })
      this._observableSubscriptions.push(s);
    }

    
    private _handleMapMouseEvents() {
        type Event = {type: MouseEventType, name: string};
        const events: Event[] = [
            { type: MouseEventType.click, name: 'click' },
            { type: MouseEventType.dblClick, name: 'dblclick' },
            { type: MouseEventType.mousedown, name: 'mousedown'},
            { type: MouseEventType.mouseenter, name: 'mouseenter' },
            { type: MouseEventType.mouseleave, name: 'mouseleave' },
            { type: MouseEventType.mousemove, name: 'mousemove' },
            { type: MouseEventType.mouseup, name: 'mouseup' },
            { type: MouseEventType.wheel, name: 'wheel' }
        ];

        events.forEach((event: Event) => {
            const s = this._mapsWrapper.subscribeToMapEvent<any>(event.name).subscribe((e: any) => {
                const mouseEvent: MouseEvent = {
                    type: event.type,
                    name: event.name,
                    coords: e.get('coords'),
                    globalPixels: e.get('globalPixels'),
                    pagePixels: e.get('pagePixels'),
                    clientPixels: e.get('clientPixels')
                }
                this.mouseEvent.emit(mouseEvent);
                this._observableSubscriptions.push(s);
            });
        });
    }
    
    // End of event handler

    public static getAllBehaviors(): ymaps.BehaviorsType[] {
        return YaMap._inputMapBehaviors;
    }

    public static getAllControls(): ymaps.ControlType[] {
        return YaMap._inputMapControls;
    }

}
