import { Action } from '@ngrx/store';
import { AllUserData } from "../../../shared/to/all-user-data";
import { PayloadAction } from "app/core/store/payload-action";

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

