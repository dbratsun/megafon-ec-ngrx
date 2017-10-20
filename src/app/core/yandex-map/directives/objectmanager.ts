import { Directive, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MouseEvent, MouseEventType } from '../interfaces/events';
import { ObjectManagerManager } from "../services/managers/objectmanager-manager";

let managerId = 0;

@Directive({
    selector: 'ya-objectmanager'
})
export class YaObjectManager {
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
    
    private _id: string;
    private _addedToManager: boolean = false;

    constructor(private _objectManager: ObjectManagerManager) {
        this._id = (managerId++).toString();
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

    checkStatus(): boolean {
        if (!this._addedToManager) {
            const options = this.getOptions();
            this._objectManager.add(this);
            this._objectManager.addObjectsFromJson(this, this.jsonData.toString())
            this._addedToManager = true;
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.checkStatus();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.checkStatus()) return;
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

    private jsonData: string = `{
        "type": "FeatureCollection",
        "features": [
            {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 5, "geometry": {"type": "Point", "coordinates": [55.793559, 37.435983]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 6, "geometry": {"type": "Point", "coordinates": [55.800584, 37.675638]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 7, "geometry": {"type": "Point", "coordinates": [55.716733, 37.589988]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 8, "geometry": {"type": "Point", "coordinates": [55.775724, 37.56084]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 9, "geometry": {"type": "Point", "coordinates": [55.822144, 37.433781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 10, "geometry": {"type": "Point", "coordinates": [55.87417, 37.669838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 11, "geometry": {"type": "Point", "coordinates": [55.71677, 37.482338]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 12, "geometry": {"type": "Point", "coordinates": [55.78085, 37.75021]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 13, "geometry": {"type": "Point", "coordinates": [55.810906, 37.654142]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 14, "geometry": {"type": "Point", "coordinates": [55.865386, 37.713329]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 15, "geometry": {"type": "Point", "coordinates": [55.847121, 37.525797]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 16, "geometry": {"type": "Point", "coordinates": [55.778655, 37.710743]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 17, "geometry": {"type": "Point", "coordinates": [55.623415, 37.717934]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 18, "geometry": {"type": "Point", "coordinates": [55.863193, 37.737]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 19, "geometry": {"type": "Point", "coordinates": [55.86677, 37.760113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 20, "geometry": {"type": "Point", "coordinates": [55.698261, 37.730838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 21, "geometry": {"type": "Point", "coordinates": [55.6338, 37.564769]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 22, "geometry": {"type": "Point", "coordinates": [55.639996, 37.5394]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 23, "geometry": {"type": "Point", "coordinates": [55.69023, 37.405853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 24, "geometry": {"type": "Point", "coordinates": [55.77597, 37.5129]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 25, "geometry": {"type": "Point", "coordinates": [55.775777, 37.44218]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 26, "geometry": {"type": "Point", "coordinates": [55.811814, 37.440448]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 27, "geometry": {"type": "Point", "coordinates": [55.751841, 37.404853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 28, "geometry": {"type": "Point", "coordinates": [55.627303, 37.728976]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 29, "geometry": {"type": "Point", "coordinates": [55.816515, 37.597163]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 30, "geometry": {"type": "Point", "coordinates": [55.664352, 37.689397]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 31, "geometry": {"type": "Point", "coordinates": [55.679195, 37.600961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 32, "geometry": {"type": "Point", "coordinates": [55.673873, 37.658425]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 33, "geometry": {"type": "Point", "coordinates": [55.681006, 37.605126]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 34, "geometry": {"type": "Point", "coordinates": [55.876327, 37.431744]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 35, "geometry": {"type": "Point", "coordinates": [55.843363, 37.778445]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 36, "geometry": {"type": "Point", "coordinates": [55.875445, 37.549348]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 37, "geometry": {"type": "Point", "coordinates": [55.662903, 37.702087]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 38, "geometry": {"type": "Point", "coordinates": [55.746099, 37.434113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 39, "geometry": {"type": "Point", "coordinates": [55.83866, 37.712326]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 40, "geometry": {"type": "Point", "coordinates": [55.774838, 37.415725]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 41, "geometry": {"type": "Point", "coordinates": [55.871539, 37.630223]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 42, "geometry": {"type": "Point", "coordinates": [55.657037, 37.571271]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 43, "geometry": {"type": "Point", "coordinates": [55.691046, 37.711026]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 44, "geometry": {"type": "Point", "coordinates": [55.803972, 37.65961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 45, "geometry": {"type": "Point", "coordinates": [55.616448, 37.452759]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 46, "geometry": {"type": "Point", "coordinates": [55.781329, 37.442781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 47, "geometry": {"type": "Point", "coordinates": [55.844708, 37.74887]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 48, "geometry": {"type": "Point", "coordinates": [55.723123, 37.406067]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
            {"type": "Feature", "id": 49, "geometry": {"type": "Point", "coordinates": [55.858585, 37.48498]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}}
        ]
    }`
}