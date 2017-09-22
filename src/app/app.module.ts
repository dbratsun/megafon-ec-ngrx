import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ModulesModule } from "app/modules/modules.module";
import { UserService } from "app/shared/services/user.service";
import { uiState } from "app/core/store/reducers/uiStateReducer";
import { storeData } from "app/core/store/reducers/uiStoreDataReducer";

import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationState } from "app/core/store/application-state";
import { UiState } from "app/core/store/ui-state";
import { LoadUsersEffectService } from "app/core/store/effects/load-users-effect.service";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';

const reducers = {
  uiState: uiState,
  storeData: storeData
}

const combineReducer = combineReducers(reducers);
const metaReducers: ActionReducer<any, any>[] = process.env.NODE_ENV === 'dev' ? [logger] : []

function logger(reducer: ActionReducer<ApplicationState>) {
  return function(state: ApplicationState, action: any) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action)
  }  
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ModulesModule,
    CoreModule,
    StoreModule.forRoot(reducers, { }),
    // EffectsModule.run(LoadUsersEffectService)
    EffectsModule.forRoot([LoadUsersEffectService])
  ],  
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
