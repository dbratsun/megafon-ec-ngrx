import { Component, Directive, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChildren, QueryList, AfterViewInit, AfterContentInit, ContentChildren } from '@angular/core';
import { MouseEvent, MouseEventType } from '../interfaces/events';
import { ObjectManagerManager } from "../services/managers/objectmanager-manager";
import { YaObjectManagerObjects } from "app/core/yandex-map/directives/objectmanager-objects";

let managerId = 0;

@Component({
    selector: 'ya-objectmanager',
    template: `
        <div class="ya-objectmanager-inner"></div>
        <div class="ya-objectmanager-content">
            <ng-content></ng-content>
        </div>
    `
})
export class YaObjectManager implements AfterContentInit, OnInit, OnChanges {

    @ContentChildren(YaObjectManagerObjects) objects: QueryList<YaObjectManagerObjects>;

    @Input() clusterize: boolean = false;
    @Input() syncOverlayInit: boolean = false;
    @Input() viewportMargin: number = 128;

    // Clusterer options
    @Input() gridSize: number = 64;
    @Input() groupByCoordinates: boolean = false;
    // excluded @Input() hasBalloon: boolean = true;
    // excluded @Input() hasHint: boolean = true;
    @Input() margin: number[][] | number[] = [10];
    @Input() maxZoom: number[] = [Infinity];
    @Input() minClusterSize: number = 2;
    @Input() preset: ymaps.PresetKey = "";
    @Input() showInAlphabeticalOrder: boolean = false;
    @Input() useMapMargin: boolean = true;
    @Input() zoomMargin: number[][] | number[] = [0];

    // ClusterPlacemark options
    @Input() clusterBalloonContentLayout: ymaps.BalloonContentLayoutKey = "cluster#balloonTwoColumns";
    @Input() clusterBalloonContentLayoutHeight: number = 210; // depends on balloonContentLayout
    @Input() clusterBalloonContentLayoutWidth: number = 475; // depends on balloonContentLayout
    @Input() clusterBalloonItemContentLayout: string | ymaps.ILayout = "cluster#balloonTwoColumnsItemContent";
    @Input() clusterBalloonPanelContentLayout: string = null;
    @Input() clusterCursor: string = "pointer";
    @Input() clusterDisableClickZoom: boolean = false;
    @Input() clusterHideIconOnBalloonOpen: boolean = true;
    @Input() clusterIconColor: string = undefined;
    @Input() clusterIconContentLayout: string = "cluster#iconContent";
    @Input() clusterIconLayout: string = 'cluster#icon';
    @Input() clusterIcons: ymaps.ClusterPlacemarkOptionsIconsType[] = [];
    @Input() clusterIconShape: ymaps.IGeometryJson = undefined;
    @Input() clusterInteractivityModel: ymaps.InteractivityModelKey = "default#geoObject";
    @Input() clusterNumbers: number[] = [10, 100];
    @Input() clusterOpenBalloonOnClick: boolean = true;
    @Input() clusterOpenEmptyHint: boolean = false;
    @Input() clusterOpenHintOnHover: boolean = true;
    @Input() clusterZIndexHover: number = undefined;

    @Input() geoObjectCircleOverlay?: string = "default#circle";
    @Input() geoObjectCursor?: string = "pointer";
    @Input() geoObjectDraggable?: boolean = false;
    @Input() geoObjectFill?: boolean = true;
    @Input() geoObjectFillColor?: string = "0066ff99";
    @Input() geoObjectFillImageHref?: string = undefined;
    @Input() geoObjectFillMethod?: "stretch";
    @Input() geoObjectFillOpacity?: number = 1;
    @Input() geoObjectHasBalloon?: boolean = true;
    @Input() geoObjectHasHint?: boolean = true;
    @Input() geoObjectHideIconOnBalloonOpen?: boolean = true;
    @Input() geoObjectIconCaptionMaxWidth?: number = 188;
    @Input() geoObjectIconColor?: string = undefined;
    @Input() geoObjectIconContentLayout?: string = undefined;
    @Input() geoObjectIconContentOffset?: number[] = undefined;
    @Input() geoObjectIconContentPadding?: number[] = undefined;
    @Input() geoObjectIconContentSize?: number[] = undefined;
    @Input() geoObjectIconImageClipRect?: number[][] = undefined;
    @Input() geoObjectIconImageHref?: string = undefined;
    @Input() geoObjectIconImageOffset?: number[] = undefined;
    @Input() geoObjectIconImageShape?: ymaps.IShape = undefined;
    @Input() geoObjectIconImageSize?: number[] = undefined;
    @Input() geoObjectIconLayout?: string = undefined;
    @Input() geoObjectIconMaxHeight?: number = undefined;
    @Input() geoObjectIconMaxWidth?: number = undefined;
    @Input() geoObjectIconOffset?: number[] = [0, 0];
    @Input() geoObjectIconShadow?: boolean = false;
    @Input() geoObjectIconShadowImageClipRect?: number[][] = undefined;
    @Input() geoObjectIconShadowImageHref?: string = undefined;
    @Input() geoObjectIconShadowImageOffset?: number[] = undefined;
    @Input() geoObjectIconShadowImageSize?: number[] = undefined;
    @Input() geoObjectIconShadowLayout?: string = undefined;
    @Input() geoObjectIconShadowOffset?: number[] = undefined;
    @Input() geoObjectInteractiveZIndex?: boolean = undefined;
    @Input() geoObjectInteractivityModel?: ymaps.InteractivityModelKey = "default#geoObject";
    @Input() geoObjectLineStringOverlay?: ymaps.OverlayKey = "default#polyline";
    @Input() geoObjectOpacity?: number = 1;
    @Input() geoObjectOpenBalloonOnClick?: boolean = true;
    @Input() geoObjectOpenEmptyBalloon?: boolean = false;
    @Input() geoObjectOpenEmptyHint?: boolean = false;
    @Input() geoObjectOpenHintOnHover?: boolean = true;
    @Input() geoObjectOutline?: boolean = true;
    @Input() geoObjectPane?: string = undefined;
    @Input() geoObjectPointOverlay?: ymaps.OverlayKey = "default#placemark";
    @Input() geoObjectPolygonOverlay?: ymaps.OverlayKey = "default#polygon";
    @Input() geoObjectPreset?: string = undefined;
    @Input() geoObjectRectangleOverlay?: ymaps.OverlayKey = "default#rectangle";
    @Input() geoObjectSetMapCursorInDragging?: boolean = false;
    @Input() geoObjectStrokeColor?: string[][] | string[] | string = "0066ffff";
    @Input() geoObjectStrokeOpacity?: number[][] | number[] | number = 1;
    @Input() geoObjectStrokeStyle?: string[][][] | object[][] | string[] | object[] | string | object = undefined;
    @Input() geoObjectStrokeWidth?: number[][] | number[] | number = 1;
    @Input() geoObjectSyncOverlayInit?: boolean = false;
    @Input() geoObjectUseMapMarginInDragging?: boolean = true;
    @Input() geoObjectVisible?: boolean = true;
    @Input() geoObjectZIndex?: number = undefined;
    @Input() geoObjectZIndexActive?: number = undefined;
    @Input() geoObjectZIndexDrag?: number = undefined;
    @Input() geoObjectZIndexHover?: number = undefined;

    @Output() geometryChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();
    @Output() mapChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();
    @Output() optionsChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();
    @Output() overlayChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();
    @Output() parentChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();
    @Output() propertiesChange: EventEmitter<ymaps.IEvent> = new EventEmitter<ymaps.IEvent>();

    @Output() mouseEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Input() geoJson: Object | string | null = null;

    private _id: string;
    private _addedToManager: boolean = false;

    constructor(private _objectManager: ObjectManagerManager) {
        this._id = (managerId++).toString();
    }

    ngAfterContentInit() {
        this.objects.forEach(m => {
            m.setObjectManager(this); 
        });
    }

    private getOptions(): ymaps.IObjectManagerOptions {
        return {
            clusterize: this.clusterize,
            syncOverlayInit: this.syncOverlayInit,
            gridSize: this.gridSize,
            groupByCoordinates: this.groupByCoordinates,
            margin: this.margin,
            maxZoom: this.maxZoom,
            minClusterSize: this.minClusterSize,
            preset: this.preset,
            showInAlphabeticalOrder: this.showInAlphabeticalOrder,
            useMapMargin: this.useMapMargin,
            zoomMargin: this.zoomMargin
        }
    }

    /*
    checkStatus(): boolean {
        if (!this._addedToManager) {
            const options = this.getOptions();
            this._objectManager.add(this, options);
            this._objectManager.addObjectsFromJson(this, this.jsonData.toString())
            this._addedToManager = true;
            return false;
        }
        return true;
    }
    */

    createManager() {
        if (this._addedToManager) {
            return;
        }
        const options = this.getOptions();
        this._objectManager.add(this, options);
            // this._objectManager.addObjectsFromJson(this, this.jsonData.toString())
        this._addedToManager = true;
    }

    addObjects(objects: ymaps.ObjectManagerObjectsCollectionCore) {
        this._objectManager.addObjects(this, objects);
    }

    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this.createManager();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._addedToManager) { 
            this.createManager();
        }
        /*
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._objectManager.updateGeoJson(this, geoJsonChange.currentValue);
            this._objectManager.setObjectsOptions(this, {
                preset: 'islands#grayIcon'
            })
        }
        */
    }

    private _handleMapMouseEvents() {
        type Event = {type: MouseEventType, name: string};
        const events: Event[] = [
            { type: MouseEventType.click, name: 'click' },
            { type: MouseEventType.contextMenu, name: 'contextmenu' },
            { type: MouseEventType.dblClick, name: 'dblclick' },
            { type: MouseEventType.mousedown, name: 'mousedown'},
            { type: MouseEventType.mouseenter, name: 'mouseenter' },
            { type: MouseEventType.mouseleave, name: 'mouseleave' },
            { type: MouseEventType.mousemove, name: 'mousemove' },
            { type: MouseEventType.mouseup, name: 'mouseup' },
            { type: MouseEventType.wheel, name: 'wheel' }
        ];

        /*
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
        */
    }

    private _handleGeometryChange() {
        /*
        const s = this._mapsWrapper.subscribeToMapEvent<ymaps.IEvent>('typechange').subscribe((event: ymaps.IEvent) => {
            this._mapsWrapper.getType().then((type: string) => {
                this.type = type as ymaps.MapStateType;
                this.typeChange.emit(type);
            })
        })
        this._observableSubscriptions.push(s);
        */
    }

}
