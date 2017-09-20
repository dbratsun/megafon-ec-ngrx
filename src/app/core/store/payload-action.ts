import { Action } from "@ngrx/store";
import { Actions } from '@ngrx/effects';

export class PayloadAction implements Action {
    public type: string;
    constructor(public payload?: any) { }
}

export type PayloadActions = Actions<PayloadAction>;
