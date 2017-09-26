import { Action } from '@ngrx/store';
import { AllUserData } from "../../../shared/to/all-user-data";
import { PayloadAction } from "app/core/store/payload-action";
import { AllAbonentData } from "shared/to/all-abonent-data";

// User

export const LOAD_USERS_ACTION = 'LOAD_USERS_ACTION';
export const USERS_LOADED_ACTION = 'USERS_LOADED_ACTION';
export const USER_SELECTED_ACTION = 'USER_SELECTED_ACTION';

export class LoadUsersAction implements PayloadAction {
    readonly type: string = LOAD_USERS_ACTION;
}

export class UsersLoadedAction implements PayloadAction {
    readonly type: string = USERS_LOADED_ACTION;
    constructor(public payload?: AllUserData) {}
}

export class UserSelectedAction implements PayloadAction {
    readonly type: string = USER_SELECTED_ACTION;
    constructor(public payload: number) {}
}

// Abonent

export const LOAD_ABONENTS_ACTION = 'LOAD_ABONENTS_ACTION';
export const ABONENTS_LOADED_ACTION = 'ABONENTS_LOADED_ACTION';
export const ABONENT_SELECTED_ACTION = 'ABONENT_SELECTED_ACTION';

export class LoadAbonentsAction implements PayloadAction {
    readonly type: string = LOAD_ABONENTS_ACTION;
}

export class AbonentsLoadedAction implements PayloadAction {
    readonly type: string = ABONENTS_LOADED_ACTION;
    constructor(public payload?: AllAbonentData) {}
}

export class AbonentSelectedAction implements PayloadAction {
    readonly type: string = ABONENT_SELECTED_ACTION;
    constructor(public payload: number) {}
}
