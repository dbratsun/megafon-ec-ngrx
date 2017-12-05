import { YaMap } from '../../../core/yandex-map/directives/map';
import { MouseEvent, MouseEventType } from '../../../core/yandex-map/interfaces/events';
import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, QueryList } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../core/store/application-state";
import { Observable } from "rxjs/Observable";
import { AbonentDetailVM } from "./abonent-detail.vm";
import { abonentNameSelector } from "./abonentNameSelector";
import { abonentDetailsSelector } from "./abonentDetailsSelector";
import { abonentHasDetailsSelector } from "./abonentHasDetailsSelector";

type behaviorsCheck = {
    name: string;
    value: string;
    checked: boolean;
}


@Component({
  selector: 'abonent-detail-section',
  templateUrl: './abonent-detail-section.component.html',
  styleUrls: ['./abonent-detail-section.component.scss']
})
export class AbonentDetailSectionComponent implements OnInit {

  abonentName$: Observable<string>;
  abonentDetails$: Observable<AbonentDetailVM[]>;
  abonentHasDetails$: Observable<boolean>;

  currentAbonentId: number;
  center: ymaps.LatLng;
  mouseEvent: {
      name: string,
      coord: ymaps.LatLng
  };

  exitFullscreenByEsc: boolean;
  minZoom: number;
  maxZoom: number;
  zoom: number;

  behaviors: ymaps.BehaviorsType[];
  allBehaviors: ymaps.BehaviorsType[];
  controls: ymaps.ControlKey[];
  allControls: ymaps.ControlKey[];

  @ViewChild('map') map: YaMap;
  nmap: ymaps.Map;
  // @ViewChild('map') map: ElementRef;

  constructor(private store: Store<ApplicationState>) {
    this.abonentName$ = store.select(abonentNameSelector);
    this.abonentDetails$ = store.select(abonentDetailsSelector);
    this.abonentHasDetails$ = store.select(abonentHasDetailsSelector);
    store.subscribe(
      state => {
        if (state.uiState.currentAbonentId != this.currentAbonentId) {
            this.center = undefined;
        }
      }
    )
    this.exitFullscreenByEsc = true;
    this.minZoom = 0;
    this.maxZoom = 23;
    this.zoom = 13;
    this.behaviors = ['default']; // ['drag', 'scrollZoom', 'ruler'];
    this.allBehaviors = YaMap.getAllBehaviors();
    this.controls = ['geolocationControl', 'routeEditor', 'trafficControl', 'zoomControl', 'rulerControl', 'typeSelector'];
    this.allControls = YaMap.getAllControls();
  }

  ngOnInit() {
    this.center = undefined;
  }

  onCenterChange(center: ymaps.LatLng) {
    const map = this.map.nativeMap();
    this.center = center;
  }

  onZoomChange(zoom: number) {
    this.zoom = zoom;
  }

  behaviorChanged(event) {
    this.behaviors = event;
  }

  controlsChanged(event) {
    this.controls = event;
  }

  onMouseEvent(event: MouseEvent) {
    this.mouseEvent = {
      name: event.name,
      coord: {
        lat: event.coords[0],
        lng: event.coords[1]
      }
    }
  }

  jsonData4: ymaps.ObjectManagerObjectsCollectionCore = {
    features: [
      {
        id: 0,
        geometry: {
          type: "Point", 
          coordinates: [55.775724, 37.56084]
        },
        properties: {
          balloonContentHeader: "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", 
          balloonContentBody: "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", 
          balloonContentFooter: "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
          clusterCaption: "<strong><s>Еще</s> одна</strong> метка",
          hintContent: "<strong>ID: 2</strong>"    
        },
        options: {
          preset: "islands#redIcon",
          opacity: 0.1,
          fillColor: '#FFFFFF'
        }
      },
      {
        id: 1,
        geometry: {
          type: "Point", 
          coordinates: [55.744522, 37.616378]
        },
        properties: {
          balloonContentHeader: "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", 
          balloonContentBody: "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", 
          balloonContentFooter: "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
          clusterCaption: "<strong><s>Еще</s> одна</strong> метка",
          hintContent: "<strong>Текст <s>подсказки</s></strong>"    
        },
        options: {
          preset: "islands#greenIcon"
        }
      },
      {
        id: 2,
        geometry: {
          type: "Point", 
          coordinates: [55.780898, 37.642889]
        },
        properties: {
          balloonContentHeader: "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", 
          balloonContentBody: "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", 
          balloonContentFooter: "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
          clusterCaption: "<strong><s>Еще</s> одна</strong> метка",
          hintContent: "<strong>Текст  <s>подсказки</s></strong>"    
        },
        options: {
          preset: "islands#blueIcon"
        }
      },
      {
        id: 3,
        geometry: {
          type: "Circle", 
          coordinates: [55.764286, 37.606169],
          radius: 800
        }
      },
      {
        id: 4,
        geometry: {
          type: "Rectangle",
          coordinates: [
            [55.764286, 37.606169],
            [55.759688, 37.620588]
          ]
        },
        options: {
          fillColor: '#FFF000',
          opacity: 0.9
        }
      },
      {
        id: 5,
        geometry: {
            type: 'Polygon',
            coordinates: [[
                [55.75175065, 37.6041094],
                [55.75005637, 37.6137224],
                [55.742891186, 37.6166407],
                [55.74153546, 37.60342281],
                [55.74700649, 37.59775798]
            ]]
        },
        options: {
            opacity: 0.2,
            strokeWidth: 2,
            fillColor: '#00FF00'
        }
      },
      {
        id: 6,
        geometry: {
          type: 'LineString',
          coordinates: [
            [
              55.80899899270488,
              37.77442932128906
            ],
            [
              55.800895029938275,
              37.74696350097656
            ],
            [
              55.795877445664104,
              37.709197998046875
            ]
          ]
        },
        options: {
          strokeWidth: 3
        }
      }        
    ]
  };

  jsonData3: ymaps.ObjectManagerObjectsCollectionCore = {
    "features": [
        { "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
    ]    
  }    


  jsonData2: ymaps.ObjectManagerObjectsCollectionCore = {
    features: [
      {
        id: 33,
        geometry: {
          type: "Circle", 
          coordinates: [55.780000, 37.626169],
          radius: 300
        },
        options: {
          opacity: 0.5
        }
      }
    ]
  };

  jsonData1: ymaps.ObjectManagerObjectsCollectionCore = {
    "features": [
        { "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 5, "geometry": {"type": "Point", "coordinates": [55.793559, 37.435983]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 6, "geometry": {"type": "Point", "coordinates": [55.800584, 37.675638]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 7, "geometry": {"type": "Point", "coordinates": [55.716733, 37.589988]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 8, "geometry": {"type": "Point", "coordinates": [55.775724, 37.56084]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 9, "geometry": {"type": "Point", "coordinates": [55.822144, 37.433781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 10, "geometry": {"type": "Point", "coordinates": [55.87417, 37.669838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 11, "geometry": {"type": "Point", "coordinates": [55.71677, 37.482338]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 12, "geometry": {"type": "Point", "coordinates": [55.78085, 37.75021]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 13, "geometry": {"type": "Point", "coordinates": [55.810906, 37.654142]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 14, "geometry": {"type": "Point", "coordinates": [55.865386, 37.713329]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 15, "geometry": {"type": "Point", "coordinates": [55.847121, 37.525797]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 16, "geometry": {"type": "Point", "coordinates": [55.778655, 37.710743]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 17, "geometry": {"type": "Point", "coordinates": [55.623415, 37.717934]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 18, "geometry": {"type": "Point", "coordinates": [55.863193, 37.737]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 19, "geometry": {"type": "Point", "coordinates": [55.86677, 37.760113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 20, "geometry": {"type": "Point", "coordinates": [55.698261, 37.730838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 21, "geometry": {"type": "Point", "coordinates": [55.6338, 37.564769]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 22, "geometry": {"type": "Point", "coordinates": [55.639996, 37.5394]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 23, "geometry": {"type": "Point", "coordinates": [55.69023, 37.405853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 24, "geometry": {"type": "Point", "coordinates": [55.77597, 37.5129]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 25, "geometry": {"type": "Point", "coordinates": [55.775777, 37.44218]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 26, "geometry": {"type": "Point", "coordinates": [55.811814, 37.440448]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 27, "geometry": {"type": "Point", "coordinates": [55.751841, 37.404853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 28, "geometry": {"type": "Point", "coordinates": [55.627303, 37.728976]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 29, "geometry": {"type": "Point", "coordinates": [55.816515, 37.597163]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 30, "geometry": {"type": "Point", "coordinates": [55.664352, 37.689397]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 31, "geometry": {"type": "Point", "coordinates": [55.679195, 37.600961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 32, "geometry": {"type": "Point", "coordinates": [55.673873, 37.658425]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 33, "geometry": {"type": "Point", "coordinates": [55.681006, 37.605126]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 34, "geometry": {"type": "Point", "coordinates": [55.876327, 37.431744]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 35, "geometry": {"type": "Point", "coordinates": [55.843363, 37.778445]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 36, "geometry": {"type": "Point", "coordinates": [55.875445, 37.549348]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 37, "geometry": {"type": "Point", "coordinates": [55.662903, 37.702087]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 38, "geometry": {"type": "Point", "coordinates": [55.746099, 37.434113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 39, "geometry": {"type": "Point", "coordinates": [55.83866, 37.712326]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 40, "geometry": {"type": "Point", "coordinates": [55.774838, 37.415725]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 41, "geometry": {"type": "Point", "coordinates": [55.871539, 37.630223]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 42, "geometry": {"type": "Point", "coordinates": [55.657037, 37.571271]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 43, "geometry": {"type": "Point", "coordinates": [55.691046, 37.711026]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 44, "geometry": {"type": "Point", "coordinates": [55.803972, 37.65961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 45, "geometry": {"type": "Point", "coordinates": [55.616448, 37.452759]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 46, "geometry": {"type": "Point", "coordinates": [55.781329, 37.442781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 47, "geometry": {"type": "Point", "coordinates": [55.844708, 37.74887]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 48, "geometry": {"type": "Point", "coordinates": [55.723123, 37.406067]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 49, "geometry": {"type": "Point", "coordinates": [55.858585, 37.48498]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}}
    ]
    
  }    

  jsonData: string = `{
    "type": "FeatureCollection",
    "features": [
        { "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 5, "geometry": {"type": "Point", "coordinates": [55.793559, 37.435983]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 6, "geometry": {"type": "Point", "coordinates": [55.800584, 37.675638]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 7, "geometry": {"type": "Point", "coordinates": [55.716733, 37.589988]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 8, "geometry": {"type": "Point", "coordinates": [55.775724, 37.56084]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 9, "geometry": {"type": "Point", "coordinates": [55.822144, 37.433781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 10, "geometry": {"type": "Point", "coordinates": [55.87417, 37.669838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 11, "geometry": {"type": "Point", "coordinates": [55.71677, 37.482338]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 12, "geometry": {"type": "Point", "coordinates": [55.78085, 37.75021]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 13, "geometry": {"type": "Point", "coordinates": [55.810906, 37.654142]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 14, "geometry": {"type": "Point", "coordinates": [55.865386, 37.713329]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 15, "geometry": {"type": "Point", "coordinates": [55.847121, 37.525797]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 16, "geometry": {"type": "Point", "coordinates": [55.778655, 37.710743]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 17, "geometry": {"type": "Point", "coordinates": [55.623415, 37.717934]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 18, "geometry": {"type": "Point", "coordinates": [55.863193, 37.737]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 19, "geometry": {"type": "Point", "coordinates": [55.86677, 37.760113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 20, "geometry": {"type": "Point", "coordinates": [55.698261, 37.730838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 21, "geometry": {"type": "Point", "coordinates": [55.6338, 37.564769]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 22, "geometry": {"type": "Point", "coordinates": [55.639996, 37.5394]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 23, "geometry": {"type": "Point", "coordinates": [55.69023, 37.405853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 24, "geometry": {"type": "Point", "coordinates": [55.77597, 37.5129]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 25, "geometry": {"type": "Point", "coordinates": [55.775777, 37.44218]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 26, "geometry": {"type": "Point", "coordinates": [55.811814, 37.440448]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 27, "geometry": {"type": "Point", "coordinates": [55.751841, 37.404853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 28, "geometry": {"type": "Point", "coordinates": [55.627303, 37.728976]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 29, "geometry": {"type": "Point", "coordinates": [55.816515, 37.597163]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 30, "geometry": {"type": "Point", "coordinates": [55.664352, 37.689397]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 31, "geometry": {"type": "Point", "coordinates": [55.679195, 37.600961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 32, "geometry": {"type": "Point", "coordinates": [55.673873, 37.658425]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 33, "geometry": {"type": "Point", "coordinates": [55.681006, 37.605126]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 34, "geometry": {"type": "Point", "coordinates": [55.876327, 37.431744]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 35, "geometry": {"type": "Point", "coordinates": [55.843363, 37.778445]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 36, "geometry": {"type": "Point", "coordinates": [55.875445, 37.549348]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 37, "geometry": {"type": "Point", "coordinates": [55.662903, 37.702087]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 38, "geometry": {"type": "Point", "coordinates": [55.746099, 37.434113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 39, "geometry": {"type": "Point", "coordinates": [55.83866, 37.712326]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 40, "geometry": {"type": "Point", "coordinates": [55.774838, 37.415725]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 41, "geometry": {"type": "Point", "coordinates": [55.871539, 37.630223]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 42, "geometry": {"type": "Point", "coordinates": [55.657037, 37.571271]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 43, "geometry": {"type": "Point", "coordinates": [55.691046, 37.711026]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 44, "geometry": {"type": "Point", "coordinates": [55.803972, 37.65961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 45, "geometry": {"type": "Point", "coordinates": [55.616448, 37.452759]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 46, "geometry": {"type": "Point", "coordinates": [55.781329, 37.442781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 47, "geometry": {"type": "Point", "coordinates": [55.844708, 37.74887]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 48, "geometry": {"type": "Point", "coordinates": [55.723123, 37.406067]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
        { "id": 49, "geometry": {"type": "Point", "coordinates": [55.858585, 37.48498]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}}
    ]
}`


}
