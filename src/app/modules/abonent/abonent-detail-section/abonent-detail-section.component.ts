import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../core/store/application-state";
import { Observable } from "rxjs/Observable";
import { AbonentDetailVM } from "./abonent-detail.vm";
import { abonentNameSelector } from "./abonentNameSelector";
import { abonentDetailsSelector } from "./abonentDetailsSelector";
import { abonentHasDetailsSelector } from "./abonentHasDetailsSelector";

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

  exitFullscreenByEsc: boolean;

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
  }

  ngOnInit() {
    this.center = undefined;
  }

  onCenterChange(center: ymaps.LatLng) {
    this.center = center;
  }

}
