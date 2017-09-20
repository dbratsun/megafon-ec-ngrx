import { StoreData } from "app/core/store/store-data";
import { PayloadAction } from "app/core/store/payload-action";
import { USERS_LOADED_ACTION, UsersLoadedAction } from "app/core/store/actions";
import * as _ from 'lodash';

export function storeData(state: StoreData, action: PayloadAction) {
    switch (action.type) {
        case USERS_LOADED_ACTION:
            return handleLoadUsersAction(state, action);
        default:
            return state;
    }
}

function handleLoadUsersAction(state: StoreData, action: UsersLoadedAction): StoreData {
    return {
        users: _.keyBy(action.payload.users, 'id')
    }
}

