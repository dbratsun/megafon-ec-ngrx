import { User } from "shared/model/user";
import { Abonent } from "shared/model/abonent";

export interface StoreData {
    users: {[key: number]: User}
}

export const INITIAL_STORE_DATA: StoreData = {
    users: {}
}
