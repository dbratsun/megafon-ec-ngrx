import { Injectable } from '@angular/core';
import { PayloadActions, PayloadAction } from "../../../core/store/payload-action";
import { UserService } from "app/shared/services/user.service";
import { Observable } from "rxjs/Observable";
import { Effect, Actions } from "@ngrx/effects";
import { LOAD_USERS_ACTION, UsersLoadedAction } from "app/core/store/actions";

@Injectable()
export class LoadUsersEffectService {

  constructor(private actions$: Actions, private usersService: UserService) { }

  @Effect() appUsers$: Observable<PayloadAction> = this.actions$
    .ofType(LOAD_USERS_ACTION)
    .switchMap(() => this.usersService.loadUsers())
    .map(userData => new UsersLoadedAction(userData))
    
}
