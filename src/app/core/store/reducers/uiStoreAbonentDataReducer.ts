import { StoreAbonentsData, StoreAbonentDetailData } from "app/core/store/store-abonent-data";
import { PayloadAction } from "app/core/store/payload-action";
import { ABONENTS_LOADED_ACTION, AbonentsLoadedAction, ABONENT_DETAIL_LOADED_ACTION, AbonentDetailLoadedAction } from "app/core/store/actions";
import * as _ from 'lodash';

export function storeAbonentsData(state: StoreAbonentsData, action: PayloadAction) {
    switch (action.type) {
        case ABONENTS_LOADED_ACTION:
            return handleLoadAbonentsAction(state, action);
        default:
            return state;
    }
}

function handleLoadAbonentsAction(state: StoreAbonentsData, action: AbonentsLoadedAction): StoreAbonentsData {
    return {
        abonents: _.keyBy(action.payload.abonents, 'id'),
        abonentGroups: _.keyBy(action.payload.abonentGroups, 'id')
    }
}

export function storeAbonentDetailData(state: StoreAbonentDetailData, action: PayloadAction) {
    switch (action.type) {
        case ABONENT_DETAIL_LOADED_ACTION:
            return handleLoadAbonentDetailAction(state, action);
    default:
            return state;
    }
}

function handleLoadAbonentDetailAction(state: StoreAbonentDetailData, action: AbonentDetailLoadedAction): StoreAbonentDetailData {
    return {
        abonent: action.payload.abonent,
        locations: _.keyBy(action.payload.locations, 'id')
    }    
}

