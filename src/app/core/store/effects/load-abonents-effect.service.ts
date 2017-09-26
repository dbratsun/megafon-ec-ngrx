import { Injectable } from '@angular/core';
import { PayloadActions, PayloadAction } from "../../../core/store/payload-action";
import { AbonentService } from "app/shared/services/abonent.service";
import { Observable } from "rxjs/Observable";
import { Effect, Actions } from "@ngrx/effects";
import { LOAD_ABONENTS_ACTION, AbonentsLoadedAction } from "app/core/store/actions";

@Injectable()
export class LoadAbonentsEffectService {

  constructor(private actions$: Actions, private abonentsService: AbonentService) { }
  
    @Effect() appAbonents$: Observable<PayloadAction> = this.actions$
      .ofType(LOAD_ABONENTS_ACTION)
      .switchMap(() => this.abonentsService.loadAbonents())
      .map(userData => new AbonentsLoadedAction(userData))
      
  
}
