import { User } from "shared/model/user";

export interface StoreData {
    users: {[key: number]: User}
}

export const INITIAL_STORE_DATA: StoreData = {
    users: {}
}
