import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ModulesModule } from "app/modules/modules.module";
import { uiState } from "app/core/store/reducers/uiStateReducer";

import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationState } from "app/core/store/application-state";
import { UiState } from "app/core/store/ui-state";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { storeAbonentsData, storeAbonentDetailData } from "app/core/store/reducers/uiStoreAbonentDataReducer";
import { AbonentsService } from "app/shared/services/abonents.service";
import { LoadAbonentsEffectService } from "app/core/store/effects/load-abonents-effect.service";
import { AbonentDetailService } from "app/shared/services/abonent-detail.service";
import { LoadAbonentDetailEffectService } from "app/core/store/effects/load-abonent-detail-effect.service";

// import { YaCoreModule } from 'angular2-yandex-maps';
// import { AgmCoreModule } from '@agm/core';
import { YandexMapModule } from './core/yandex-map/yandex-map.module';

const reducers = {
  uiState: uiState,
  storeAbonentsData: storeAbonentsData,
  storeAbonentDetailData: storeAbonentDetailData
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
    EffectsModule.forRoot([LoadAbonentsEffectService, LoadAbonentDetailEffectService]),
    // YaCoreModule.forRoot()
    // AgmCoreModule.forRoot('AIzaSyBIzVfqrmUKLhY95dxlagwK-8SOZB0Q3tQ')
    YandexMapModule.forRoot()
  ],
  providers: [AbonentsService, AbonentDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
