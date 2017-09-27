import { UiState, INITIAL_UI_STATE } from "app/core/store/ui-state";
import { Action } from "@ngrx/store";
import { ABONENT_SELECTED_ACTION } from "app/core/store/actions";
import { PayloadAction } from "app/core/store/payload-action";

export function uiState(state: UiState = INITIAL_UI_STATE, action: PayloadAction): UiState {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ABONENT_SELECTED_ACTION:
            newState.currentAbonentId = action.payload;
            return newState;
        default:
            return state;
    }
}

