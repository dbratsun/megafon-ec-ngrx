import { UiState, INITIAL_UI_STATE } from "app/core/store/ui-state";
import { Action } from "@ngrx/store";
import { USER_SELECTED_ACTION } from "app/core/store/actions";
import { PayloadAction } from "app/core/store/payload-action";

export function uiState(state: UiState = INITIAL_UI_STATE, action: PayloadAction): UiState {
    switch (action.type) {
        case USER_SELECTED_ACTION: 
            const newState = Object.assign({}, state);
            newState.currentUserId = action.payload;
            return newState;
        default:
            return state;
    }
}
