import { UiState, INITIAL_UI_STATE } from "app/core/store/ui-state";
import { StoreAbonentsData, StoreAbonentDetailData, INITIAL_STORE_ABONENTS_DATA, INITIAL_STORE_ABONENT_DETAIL_DATA } from "app/core/store/store-abonent-data";

export interface ApplicationState {
    uiState: UiState;
    storeAbonentsData: StoreAbonentsData;
    storeAbonentDetailData: StoreAbonentDetailData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeAbonentsData: INITIAL_STORE_ABONENTS_DATA,
    storeAbonentDetailData: INITIAL_STORE_ABONENT_DETAIL_DATA
}
