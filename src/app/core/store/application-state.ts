import { UiState, INITIAL_UI_STATE } from "app/core/store/ui-state";
import { StoreData, INITIAL_STORE_DATA } from "app/core/store/store-data";
import { StoreAbonentData, INITIAL_STORE_ABONENT_DATA } from "app/core/store/store-abonent-data";

export interface ApplicationState {
    uiState: UiState;
    storeData: StoreData;
    storeAbonentData: StoreAbonentData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA,
    storeAbonentData: INITIAL_STORE_ABONENT_DATA
}
