import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import { AbonentDetailService } from "app/shared/services/abonent-detail.service";
import { Observable } from "rxjs/Observable";
import { PayloadAction, PayloadActions } from "../payload-action";
import { LOAD_ABONENT_DETAIL_ACTION, AbonentDetailLoadedAction } from "../actions";
import { Store, Action } from "@ngrx/store";
import { ApplicationState } from "app/core/store/application-state";

@Injectable()
export class LoadAbonentDetailEffectService {

  constructor(private actions$: Actions, private abonentDetailService: AbonentDetailService) { }

  @Effect() appAbonentDetail$: Observable<Action> = this.actions$
    .ofType(LOAD_ABONENT_DETAIL_ACTION)
    .switchMap(action => this.abonentDetailService.loadAbonentDetail((action as PayloadAction).payload))
    .map(abonentDetailData => new AbonentDetailLoadedAction(abonentDetailData))
  
}
