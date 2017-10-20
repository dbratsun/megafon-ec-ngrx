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

}
