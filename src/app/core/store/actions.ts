import { Action } from '@ngrx/store';
import { PayloadAction } from "../store/payload-action";
import { AllAbonentsData } from "../../../shared/to/all-abonents-data";
import { AbonentDetailData } from "../../../shared/to/abonent-detail-data";

// Abonent

export const LOAD_ABONENTS_ACTION = 'LOAD_ABONENTS_ACTION';
export const ABONENTS_LOADED_ACTION = 'ABONENTS_LOADED_ACTION';
export const ABONENT_SELECTED_ACTION = 'ABONENT_SELECTED_ACTION';
export const LOAD_ABONENT_DETAIL_ACTION = 'LOAD_ABONENT_DETAIL_ACTION';
export const ABONENT_DETAIL_LOADED_ACTION = 'ABONENT_DETAIL_LOADED_ACTION';

export class LoadAbonentsAction implements PayloadAction {
    readonly type: string = LOAD_ABONENTS_ACTION;
}

export class AbonentsLoadedAction implements PayloadAction {
    readonly type: string = ABONENTS_LOADED_ACTION;
    constructor(public payload?: AllAbonentsData) {}
}

export class AbonentSelectedAction implements PayloadAction {
    readonly type: string = ABONENT_SELECTED_ACTION;
    constructor(public payload: number) {}
}

export class LoadAbonentDetailAction implements PayloadAction {
    readonly type: string = LOAD_ABONENT_DETAIL_ACTION;
    constructor(public payload: number) {
        const a = payload;
    }
}

export class AbonentDetailLoadedAction implements PayloadAction {
    readonly type: string = ABONENT_DETAIL_LOADED_ACTION;
    constructor(public payload?: AbonentDetailData) {}
}

