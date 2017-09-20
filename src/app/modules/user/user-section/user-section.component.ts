import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/core/store/application-state";
import { Observable } from "rxjs/Observable";
import { UserVM } from "app/modules/user/user-section/user.vm";
import { stateToUserSelector } from "app/modules/user/user-section/stateToUserSelector";
import { LoadUsersAction, UserSelectedAction } from "app/core/store/actions";
import * as _ from 'lodash';

@Component({
  selector: 'user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent implements OnInit {

  users$: Observable<UserVM[]>;
  userCount$: Observable<number>;

  constructor(private store: Store<ApplicationState>) { 
    this.users$ = store.select(stateToUserSelector);
    this.userCount$ = store.map(this.mapStateToUserCount);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUsersAction());  
  }

  mapStateToUserCount(state: ApplicationState): number {
    if (!state.storeData) return 0;
    return _.size(state.storeData.users);
  }

  onUserSelected(selectedUserId: number) {
    this.store.dispatch(new UserSelectedAction(selectedUserId));
  }

}
