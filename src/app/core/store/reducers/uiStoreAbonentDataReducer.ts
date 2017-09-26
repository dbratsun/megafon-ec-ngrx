import { StoreAbonentData } from "app/core/store/store-abonent-data";
import { PayloadAction } from "app/core/store/payload-action";
import { ABONENTS_LOADED_ACTION, AbonentsLoadedAction } from "app/core/store/actions";
import * as _ from 'lodash';

export function storeAbonentData(state: StoreAbonentData, action: PayloadAction) {
    switch (action.type) {
        case ABONENTS_LOADED_ACTION:
            return handleLoadAbonentsAction(state, action);
        default:
            return state;
    }
}

function handleLoadAbonentsAction(state: StoreAbonentData, action: AbonentsLoadedAction): StoreAbonentData {
    return {
        abonents: _.keyBy(action.payload.abonents, 'id'),
        abonentGroups: _.keyBy(action.payload.abonentGroups, 'id'),
        locations: _.keyBy(action.payload.locations, 'id')        
    }
}

