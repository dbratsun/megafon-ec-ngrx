import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/core/store/application-state";
import { Observable } from "rxjs/Observable";
import { AbonentVM } from "app/modules/abonent/abonent-section/abonent.vm";
import { stateToAbonentSelector } from "app/modules/abonent/abonent-section/stateToAbonentSelector";
import { LoadAbonentsAction, AbonentSelectedAction } from "app/core/store/actions";
import * as _ from 'lodash';

@Component({
  selector: 'abonent-section',
  templateUrl: './abonent-section.component.html',
  styleUrls: ['./abonent-section.component.scss']
})
export class AbonentSectionComponent implements OnInit {

  abonents$: Observable<AbonentVM[]>;
  abonentCount$: Observable<number>;
  currentSelectedAbonentId$: Observable<number>;

  constructor(private store: Store<ApplicationState>) { 
    this.abonents$ = store.select(stateToAbonentSelector);
    this.abonentCount$ = store.map(this.mapStateToAbonentsCount);
    this.currentSelectedAbonentId$ = store.select(state => state.uiState.currentAbonentId);
  }

  ngOnInit() {
    this.store.dispatch(new LoadAbonentsAction());
  }

  mapStateToAbonentsCount(state: ApplicationState) {
    if (!state.storeAbonentData) return 0;
    return _.size(state.storeAbonentData.abonents);  
  }

  onAbonentSelected(selectedAbonentId: number) {
    this.store.dispatch(new AbonentSelectedAction(selectedAbonentId));
  }

}
