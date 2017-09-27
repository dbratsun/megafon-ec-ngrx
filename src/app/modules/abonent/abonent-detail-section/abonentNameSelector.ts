import { ApplicationState } from "../../../core/store/application-state";

export function abonentNameSelector(state: ApplicationState): string {
    if (!state.uiState.currentAbonentId) return "";
    if (!state.storeAbonentDetailData) return "";
    return state.storeAbonentDetailData.abonent.name;
}