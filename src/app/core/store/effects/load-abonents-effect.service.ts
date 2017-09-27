import { Injectable } from '@angular/core';
import { PayloadActions, PayloadAction } from "../../../core/store/payload-action";
import { AbonentsService } from "app/shared/services/abonents.service";
import { Observable } from "rxjs/Observable";
import { Effect, Actions } from "@ngrx/effects";
import { LOAD_ABONENTS_ACTION, AbonentsLoadedAction, ABONENT_SELECTED_ACTION, LoadAbonentDetailAction } from "app/core/store/actions";
import { Action } from "@ngrx/store";

@Injectable()
export class LoadAbonentsEffectService {

  constructor(private actions$: Actions, private abonentsService: AbonentsService) { }
  
    @Effect() appAbonents$: Observable<Action> = this.actions$
      .ofType(LOAD_ABONENTS_ACTION)
      .switchMap(() => this.abonentsService.loadAbonents())
      .map(abonentsData => new AbonentsLoadedAction(abonentsData))
    
    
    @Effect() abonentSelected$: Observable<Action> = this.actions$
      .ofType(ABONENT_SELECTED_ACTION)
      .map(action => new LoadAbonentDetailAction((action as PayloadAction).payload))
    
}
